import { persistedStore } from '$lib/idb/persistedStore';

export const submissionDisplayStore = persistedStore<'card' | 'classic'>(
	'submissionDisplay',
	'card'
);
