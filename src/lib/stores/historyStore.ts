import { persistedStore } from '$lib/idb/persistedStore';

export const historyStore = persistedStore<{ urls: string[]; index: number }>(
	'history',
	{ urls: [], index: -1 },
	'session'
);
