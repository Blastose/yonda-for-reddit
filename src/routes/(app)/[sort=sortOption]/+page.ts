import type { PageLoad } from './$types';
import { getRedditPagination, jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';

export const load: PageLoad = async ({ url, params }) => {
	const jsrwrapSubreddit = jsrwrap.getSubreddit();

	const sort = params.sort as SubredditSort;
	const options = getRedditPagination<SubredditSort, Time>(url);

	if (get(navigationTypeStore) === 'bfbutton') {
		const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
		if (submissionsMaybe) {
			const submissions = submissionsMaybe;
			return { submissions, count: options.count, sort };
		}
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort, params: options });
	return { submissions, count: options.count, sort };
};
