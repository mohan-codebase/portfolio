"""Bounded checks for this portfolio's public edge. No load or exploit testing."""
import datetime, json, socket, ssl, time, urllib.request, urllib.error
from pathlib import Path
host = 'mohan-portfolio-nextjs.vercel.app'
base = 'https://' + host
results = []
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args): return None
opener = urllib.request.build_opener(NoRedirect)
def request(path, scheme='https', headers=None):
    url = scheme + '://' + host + path
    try:
        response = opener.open(urllib.request.Request(url, headers=headers or {}, method='GET'), timeout=12)
    except urllib.error.HTTPError as error:
        response = error
    body = response.read(300000).decode('utf-8', 'replace')
    result = {'path': path, 'scheme': scheme, 'status': response.code, 'headers': dict(response.headers)}
    results.append(result)
    time.sleep(.3)
    return result, body
r, _ = request('/', 'http')
r['check'] = 'HTTP redirects to HTTPS'; r['pass'] = r['status'] in [301,302,307,308] and r['headers'].get('Location',r['headers'].get('location','')).startswith(base)
for path in ['/.env','/.env.local','/.git/config','/.git/HEAD','/package.json','/next.config.ts','/api/contact','/api/admin']:
    r, body = request(path); r['check'] = 'private file or nonexistent endpoint not exposed'; r['pass'] = r['status'] in [403,404]
r, body = request('/?q=%3Cscript%3Ewindow.pentestMarker%3D1%3C%2Fscript%3E')
r['check'] = 'no raw executable query reflection'; r['pass'] = r['status']==200 and '<script>window.pentestMarker=1</script>' not in body
r, body = request('/',headers={'Origin':'https://example.invalid'})
r['check'] = 'no credentialed wildcard CORS'; h={k.lower():v for k,v in r['headers'].items()};r['pass'] = not (h.get('access-control-allow-origin')=='*' and h.get('access-control-allow-credentials','').lower()=='true')
for path in ['/','/about','/services','/work','/contact']:
    r, body = request(path);h={k.lower():v for k,v in r['headers'].items()};r['check']='page security header inventory';r['missing_headers']=[k for k in ['content-security-policy','x-frame-options','x-content-type-options','strict-transport-security'] if k not in h]
context=ssl.create_default_context()
with socket.create_connection((host,443),timeout=12) as sock:
    with context.wrap_socket(sock,server_hostname=host) as tls:
        cert=tls.getpeercert(); transport={'negotiated_version':tls.version(),'cipher':tls.cipher()[0],'certificate_not_after':cert['notAfter'],'hostname_and_chain_verified':True}
# Test modern TLS explicitly; no broad scans of Vercel's shared infrastructure.
for name, version in [('TLSv1.2',ssl.TLSVersion.TLSv1_2),('TLSv1.3',ssl.TLSVersion.TLSv1_3)]:
    try:
        if name == 'TLSv1.3' and not ssl.HAS_TLSv1_3:
            transport[name]='not tested: local Python lacks TLS 1.3 support'
            continue
        ctx=ssl.create_default_context();ctx.minimum_version=version;ctx.maximum_version=version
        with socket.create_connection((host,443),timeout=12) as sock:
            with ctx.wrap_socket(sock,server_hostname=host) as tls:transport[name]='supported'
    except Exception as error:transport[name]=type(error).__name__
output={'testedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'target':base,'dns_addresses':sorted({row[4][0] for row in socket.getaddrinfo(host,443,type=socket.SOCK_STREAM)}),'tls':transport,'results':results}
Path('security/production-expanded-results.json').write_text(json.dumps(output,indent=2))
print(json.dumps({'requests':len(results),'failed_checks':[r for r in results if r.get('pass') is False],'tls':transport,'header_gaps':[{ 'path':r['path'],'status':r['status'],'missing':r['missing_headers']} for r in results if 'missing_headers' in r]},indent=2))
