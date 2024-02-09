import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ status, message }) => {
	return {
		code: status,
		message: message,
		type: 'other'
	};
};
