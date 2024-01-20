import { getFullUrl } from '$lib/url/url';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { db } from '$lib/idb/idb';
export const ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const fullUrl = getFullUrl(url);

	if (fullUrl.match(/^.*[A-Z].*$/)) {
		// redirect(301, fullUrl.toLowerCase());
	}

	const loggedIn = Boolean(await db.get('redditOauth', 'reddit'));

	return { loggedIn };
};
