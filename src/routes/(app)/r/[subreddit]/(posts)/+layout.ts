import type { LayoutLoad } from './$types';
import { jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';

export const load: LayoutLoad = async ({ params, url }) => {
	const subreddit = params.subreddit;
	const sort = (params.sort ?? 'hot') as SubredditSort;
	const t = (url.searchParams.get('t') ?? 'day') as Time;
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	if (get(navigationTypeStore) === 'bfbutton') {
		const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (submissionsMaybe) {
			const submissions = submissionsMaybe;
			return { submissions };
		}
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort, params: { t } });

	return { submissions };
};
