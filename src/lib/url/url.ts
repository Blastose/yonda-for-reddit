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

export function addSearchParamToUrl(url: URL, newSearchParam: string, newSearchParamValue: string) {
	const urlClone = new URL(url);
	urlClone.searchParams.set(newSearchParam, newSearchParamValue);

	return urlClone.toString();
}

export function buildCommentThreadPermalink(id: string, pathname: string) {
	// We need to remove the first 3 characters since id starts with t3_
	const splitPaths = pathname.split('/');
	// The first 6 elements of the splitpath array form the base url for
	// the new comment permalink
	const baseUrl = splitPaths.splice(0, 6).join('/');

	const newUrl = `${baseUrl}/${id.slice(3)}`;
	return newUrl;
}

export function buildShowParentCommentsLink(id: string, pathname: string) {
	// We need to remove the first 3 characters since id starts with t3_
	const splitPaths = pathname.split('/');
	// The first 6 elements of the splitpath array form the base url for
	// the new comment permalink
	const baseUrl = splitPaths.splice(0, 6).join('/');

	const newUrl = `${baseUrl}/${id}?context=8&depth=9`;
	return newUrl;
}

export function formatSubmissionPermalink(permalink: string) {
	return removeTrailingBackslashFromUrl(permalink.toLowerCase());
}

export function showSubreddit(url: string, currentUrlSubreddit: string | undefined) {
	return currentUrlSubreddit === 'popular' || currentUrlSubreddit === 'all' || url === '/';
}
