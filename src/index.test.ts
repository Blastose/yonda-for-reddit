import { describe, it, expect } from 'vitest';
import { getFullUrl, removeTrailingBackslashFromUrl } from '$lib/url/url';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('url', () => {
	it('gets the full url', () => {
		const url = new URL('http://localhost:5173/r/genshin_impact');
		url.searchParams.set('sort', 'new');
		url.searchParams.set('type', 'all');
		const fullUrl = getFullUrl(url);
		expect(fullUrl).toBe('/r/genshin_impact?sort=new&type=all');
	});

	it('removes a trailing backslash from url', () => {
		const url = '/r/genshin_impact/comments/1907oag/you_my/';
		expect(removeTrailingBackslashFromUrl(url)).toBe('/r/genshin_impact/comments/1907oag/you_my');
		expect(removeTrailingBackslashFromUrl('/r/genshin_impact')).toBe('/r/genshin_impact');
	});
});
