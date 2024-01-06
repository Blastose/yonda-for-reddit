import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	if (
		param === 'new' ||
		param === 'rising' ||
		param === 'controversial' ||
		param === 'top' ||
		param === 'hot'
	) {
		return true;
	}
	return false;
};
