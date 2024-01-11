export function getFullUrl(url: URL) {
	return url.pathname + url.search;
}

export function removeTrailingBackslashFromUrl(url: string) {
	if (url.endsWith('/')) {
		return url.slice(0, -1);
	}
	return url;
}

export function transformUrlForIDBKey(url: URL) {
	return removeTrailingBackslashFromUrl(getFullUrl(url)).toLowerCase();
}

export function stripSearchParams(url: string) {
	return url.split('?').at(0) ?? url;
}
