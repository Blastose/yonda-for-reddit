import type { LayoutLoad } from './$types';
import { getRedditPagination, jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';

export const load: LayoutLoad = async ({ params, url }) => {
	const subreddit = params.subreddit;
	const sort = (params.sort ?? 'hot') as SubredditSort;
	const options = getRedditPagination<SubredditSort, Time>(url);
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	if (get(navigationTypeStore) === 'bfbutton') {
		const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (submissionsMaybe) {
			const submissions = submissionsMaybe;
			return { submissions, count: options.count };
		}
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort, params: options });

	return { submissions, count: options.count };
};
