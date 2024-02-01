import type { PageLoad } from './$types';
import { getRedditPagination, jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import type { SubbredditSearchParams, SubbredditSearchParamsSort } from 'jsrwrap/types';

export const load: PageLoad = async ({ params, url }) => {
	const subreddit = params.subreddit;

	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);
	const options = getRedditPagination<SubbredditSearchParamsSort, SubbredditSearchParams['t']>(
		url,
		{ defaultSort: 'relevance', defaultT: 'all' }
	);
	const q = url.searchParams.get('q') ?? undefined;
	let safeSearch = url.searchParams.get('include_over_18') ?? undefined;
	if (safeSearch !== 'on') {
		safeSearch = undefined;
	}
	const count = options.count;

	if (get(navigationTypeStore) === 'bfbutton') {
		const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (submissionsMaybe) {
			const submissions = submissionsMaybe;
			return { submissions };
		}
	}
	const submissions = jsrwrapSubreddit.search({
		...options,
		q,
		count,
		restrict_sr: true,
		include_over_18: safeSearch
	});

	console.log(await submissions);

	return { submissions, count };
};
