import { describe, expect, it } from 'vitest';
import packageJson from '../../package.json' with { type: 'json' };
import { formatVersion } from './formatVersion';

describe('formatVersion', () => {
  it('prefixes the version with "v"', () => {
    expect(formatVersion('0.1.0')).toBe('v0.1.0');
  });

  it('keeps pre-release and build suffixes', () => {
    expect(formatVersion('1.0.0-beta.2')).toBe('v1.0.0-beta.2');
  });
});

describe('__APP_VERSION__', () => {
  it('is injected from package.json', () => {
    expect(__APP_VERSION__).toBe(packageJson.version);
  });
});
