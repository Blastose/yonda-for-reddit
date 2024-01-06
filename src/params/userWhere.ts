import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	if (param === 'overview' || param === 'comments' || param === 'submitted' || param === 'gilded') {
		return true;
	}
	return false;
};
