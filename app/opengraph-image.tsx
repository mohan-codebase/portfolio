import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { hero } from '@/data/content';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const font = (file: string) => readFile(join(process.cwd(), 'assets/fonts', file));

const label = {
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Mono',
  fontSize: 16,
  letterSpacing: 1.6,
  textTransform: 'uppercase',
  color: '#8c8980',
} as const;

/** The social card: the hero, set in the site's own type. */
export default async function OpengraphImage() {
  const [display, serif, mono] = await Promise.all([
    font('MonaSans-ExtraBold.woff'),
    font('InstrumentSerif-Italic.woff'),
    font('JetBrainsMono-Regular.woff'),
  ]);
  const [first, accent, last] = hero.headline;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 64px',
          background: '#08060b',
          color: '#f8f6fc',
          fontFamily: 'Mona',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 64, right: 64, bottom: 0, display: 'flex' }}>
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                borderLeft: '1px solid rgba(248, 246, 252, 0.07)',
                borderRight: index === 11 ? '1px solid rgba(248, 246, 252, 0.07)' : 'none',
              }}
            />
          ))}
        </div>

        <div style={label}>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#9d71fd' }}>(01)</span>
            <span>&nbsp;Portfolio</span>
          </div>
          <span>
            {site.role} — {site.year}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 134, lineHeight: 0.86, letterSpacing: -6, textTransform: 'uppercase' }}>
          <span>{first}</span>
          <span style={{ fontFamily: 'Serif', fontSize: 154, letterSpacing: -3, textTransform: 'none', paddingLeft: 268 }}>{accent}</span>
          <div style={{ display: 'flex' }}>
            <span>{last}</span>
            <span style={{ color: '#9d71fd' }}>.</span>
          </div>
        </div>

        <div style={label}>
          <span style={{ color: '#f8f6fc' }}>{site.name}</span>
          <span>
            {site.location.city}, {site.location.country}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Mona', data: display, weight: 800, style: 'normal' },
        { name: 'Serif', data: serif, weight: 400, style: 'italic' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
