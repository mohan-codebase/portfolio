import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, createContactDraft } from '../lib/contact-validation.ts';
const valid = { name: 'கவின் குமார்', email: 'kavin+work@example.com', project: 'I need a responsive website.', interest: 'Website' };
test('accepts Tamil names and plus-addressed emails', () => assert.deepEqual(validateContact(valid), {}));
test('rejects blanks and whitespace', () => {
  const errors = validateContact({ ...valid, name: '  ', project: '\n  ', email: '' });
  assert.ok(errors.name && errors.email && errors.project);
});
test('rejects oversized fields even when HTML limits are bypassed', () => {
  const errors = validateContact({ ...valid, name: 'a'.repeat(101), project: 'x'.repeat(2001), email: 'a'.repeat(255)+'@example.com' });
  assert.ok(errors.name && errors.email && errors.project);
});
test('rejects header control characters and invalid addresses', () => {
  assert.ok(validateContact({ ...valid, name: 'Kavin\r\nBcc: other@example.com' }).name);
  for (const email of ['bad', 'a@@b.com', 'a b@example.com', 'a@example.com\r\nBcc:x@y.com']) assert.ok(validateContact({ ...valid, email }).email);
});
test('rejects unedited prompts and unknown project types', () => {
  assert.ok(validateContact({ ...valid, project: 'My idea: [describe your product]' }).project);
  assert.ok(validateContact({ ...valid, interest: 'Website&bcc=evil@example.com' }).interest);
});
test('keeps markup and URL-injection strings inside plain email body', () => {
  const project = '<script>alert(1)</script> &bcc=evil@example.com #fragment %0d%0a';
  const url = new URL(createContactDraft({ ...valid, project }));
  assert.equal(url.pathname, 'mohanavenkatesh.work@gmail.com');
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.ok(url.searchParams.get('body').includes(project));
  assert.equal(url.hash, '');
});
test('handles malformed Unicode without crashing and refuses invalid drafts', () => {
  assert.doesNotThrow(() => createContactDraft({ ...valid, project: 'A website idea \ud800' }));
  assert.throws(() => createContactDraft({ ...valid, name: '' }));
});
test('rejects invisible controls but allows ordinary multiline messages', () => {
  for (const character of ['\0', '\x01', '\x7f', '\r', '\n']) {
    assert.ok(validateContact({ ...valid, email: `kavin${character}@example.com` }).email);
  }
  assert.ok(validateContact({ ...valid, project: 'Website enquiry\0 hidden' }).project);
  assert.deepEqual(validateContact({ ...valid, project: 'Website enquiry\n\nI need three pages.\tThank you.' }), {});
});
test('enforces exact name and message length boundaries', () => {
  for (const length of [10, 2000]) assert.equal(validateContact({ ...valid, project: 'x'.repeat(length) }).project, undefined);
  for (const length of [9, 2001]) assert.ok(validateContact({ ...valid, project: 'x'.repeat(length) }).project);
  assert.equal(validateContact({ ...valid, name: 'x'.repeat(100) }).name, undefined);
});
test('both form categories generate only the fixed recipient and expected headers', () => {
  for (const interest of ['UI design', 'Website', 'Web application', 'Something else']) {
    const url = new URL(createContactDraft({ ...valid, interest, name: "Kavin &bcc=other@example.com" }));
    assert.equal(url.protocol, 'mailto:');
    assert.equal(url.pathname, 'mohanavenkatesh.work@gmail.com');
    assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
    assert.equal(url.searchParams.get('subject'), `${interest} enquiry`);
  }
});
