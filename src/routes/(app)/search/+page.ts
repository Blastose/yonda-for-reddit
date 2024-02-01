import type { PageLoad } from './$types';
import { getRedditPagination, jsrwrap } from '$lib/reddit/reddit';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import type { SearchParams, SearchParamsSort } from 'jsrwrap/types';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import type { Jsrwrap } from 'jsrwrap';

type SearchedResultsFull = Awaited<ReturnType<ReturnType<Jsrwrap['getSearch']>['search']>>;

export const load: PageLoad = async ({ url }) => {
	const jsrwrapSearch = jsrwrap.getSearch();
	const options = getRedditPagination<SearchParamsSort, SearchParams['t']>(url, {
		defaultSort: 'relevance',
		defaultT: 'all'
	});
	const q = url.searchParams.get('q') ?? undefined;
	const type = url.searchParams.get('type') ?? undefined;
	let safeSearch = url.searchParams.get('include_over_18') ?? undefined;
	if (safeSearch !== 'on') {
		safeSearch = undefined;
	}
	const count = options.count;

	if (get(navigationTypeStore) === 'bfbutton') {
		const searchedMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (searchedMaybe) {
			// We can do this because we know that the /search url endpoints have this format
			// Also see corresponding +page.svelte's comment
			const searched = searchedMaybe as unknown as SearchedResultsFull;
			return { searched, count };
		}
	}
	const searched = jsrwrapSearch.search({
		...options,
		q,
		count,
		type,
		include_over_18: safeSearch
	});

	return { searched, count };
};
