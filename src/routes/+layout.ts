import { getFullUrl } from '$lib/url/url';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
export const ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const fullUrl = getFullUrl(url);

	if (!url.searchParams.get('code')) {
		if (fullUrl.match(/^.*[A-Z].*$/)) {
			redirect(301, fullUrl.toLowerCase());
		}
	}

	return {};
};
