import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: LayoutLoad = async ({ params, url }) => {
	const subreddit = params.subreddit;
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));

	if (submissionsMaybe) {
		const submissions = submissionsMaybe;
		return { submissions };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'hot' });

	return { submissions };
};
