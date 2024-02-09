import { db } from '$lib/idb/idb';
import { getRedditPagination, jsrwrap } from '$lib/reddit/reddit';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load: PageLoad = async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	const options = getRedditPagination<UserSortOptions, UserTOptions>(url);
	const count = options.count;

	let overview;

	if (get(navigationTypeStore) === 'bfbutton') {
		const overviewMaybe = await db.get('redditUserCreations', transformUrlForIDBKey(url));
		if (overviewMaybe) {
			overview = overviewMaybe;

			return {
				overview,
				count
			};
		}
	}

	overview = jsrwrapUser.getOverview(options);

	return {
		overview,
		count
	};
};
