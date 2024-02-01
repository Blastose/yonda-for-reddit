import type { PageLoad } from './$types';
import { getRedditPagination, jsrwrap } from '$lib/reddit/reddit';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import type { SearchParams, SearchParamsSort } from 'jsrwrap/types';

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
		// const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		// if (submissionsMaybe) {
		// 	const submissions = submissionsMaybe;
		// 	return { submissions };
		// }
	}
	const searched = jsrwrapSearch.search({
		...options,
		q,
		count,
		type,
		include_over_18: safeSearch
	});

	console.log(await searched);

	return { searched, count };
};
