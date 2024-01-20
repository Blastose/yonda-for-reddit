import type { PageLoad } from './$types';
import { jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: PageLoad = async ({ url, params }) => {
	const jsrwrapSubreddit = jsrwrap.getSubreddit();

	const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));
	const sort = params.sort as SubredditSort;
	const t = (url.searchParams.get('t') ?? 'day') as Time;

	if (submissionsMaybe) {
		const submissions = submissionsMaybe;
		return { submissions, sort };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort, params: { t } });
	return { submissions, sort };
};
