import type { PageLoad } from './$types';
import { getRedditPagination, jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ url }) => {
	const jsrwrapSubreddit = jsrwrap.getSubreddit();
	const options = getRedditPagination<SubredditSort, Time>(url);

	if (get(navigationTypeStore) === 'bfbutton') {
		const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (submissionsMaybe) {
			const submissions = submissionsMaybe;
			return { submissions, count: options.count };
		}
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'best', params: options });

	return { submissions, count: options.count };
};
