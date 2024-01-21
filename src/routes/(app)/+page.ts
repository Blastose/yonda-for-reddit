import type { PageLoad } from './$types';
import { jsrwrap, login } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (state && code) {
		login(code);
		redirect(303, '/');
	}

	const jsrwrapSubreddit = jsrwrap.getSubreddit();

	const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));

	if (submissionsMaybe) {
		const submissions = submissionsMaybe;
		return { submissions };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'best' });

	return { submissions };
};
