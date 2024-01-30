import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { transformUrlForIDBKey } from '$lib/url/url';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load: PageLoad = async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;
	const before = url.searchParams.get('before') as string | undefined;
	const after = url.searchParams.get('after') as string | undefined;
	const count = Number(url.searchParams.get('count')) || undefined;

	const options = { sort, t, before, after, count };

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
