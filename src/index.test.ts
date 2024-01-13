import { describe, it, expect } from 'vitest';
import { getFullUrl, removeTrailingBackslashFromUrl } from '$lib/url/url';
import { formatVideoTime } from '$lib/components/subreddit/embed/video';

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

describe('time', () => {
	it('formats seconds', () => {
		expect(formatVideoTime(8)).toBe('0:08');
		expect(formatVideoTime(57)).toBe('0:57');
		expect(formatVideoTime(60)).toBe('1:00');
		expect(formatVideoTime(720)).toBe('12:00');
		expect(formatVideoTime(720)).toBe('12:00');
		expect(formatVideoTime(72000)).toBe('20:00:00');
	});
});
