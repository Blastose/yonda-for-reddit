import { persistedStore } from '$lib/idb/persistedStore';
import type { SubredditData } from 'jsrwrap/types';

export const subscribedSubsStore = persistedStore<{
	cached: number;
	value: SubredditData[];
}>(
	'subscribedSubs',
	{
		cached: 0,
		value: []
	},
	'local'
);

export const pinnedSubsStore = persistedStore<
	{ iconUrl: string | undefined; displayName: string }[]
>('pinnedSubs', [], 'local');
