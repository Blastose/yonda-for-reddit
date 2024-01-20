import type { PageLoad } from './$types';
import { login } from '$lib/reddit/reddit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (state && code) {
		await login(code);
		redirect(303, '/');
	}
};
