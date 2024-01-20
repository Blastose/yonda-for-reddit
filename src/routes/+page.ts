import type { PageLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: PageLoad = async ({ url }) => {
	const jsrwrapSubreddit = jsrwrap.getSubreddit();

	const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));

	if (submissionsMaybe) {
		const submissions = submissionsMaybe;
		return { submissions };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'best' });

	return { submissions };
};
