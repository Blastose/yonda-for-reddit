import { jsrwrap } from '$lib/reddit/reddit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const username = params.username;

	const user = jsrwrap.getUser(username);
	const about = await user.getAbout();
	return {
		about,
		username
	};
};
