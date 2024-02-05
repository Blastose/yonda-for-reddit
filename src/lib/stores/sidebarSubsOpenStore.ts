import { persistedStore } from '$lib/idb/persistedStore';

export const pinnedSubsOpenStore = persistedStore<boolean>('pinnedSubsOpen', true, 'local');

export const subscribedSubsOpenStore = persistedStore<boolean>('subscribedSubsOpen', true, 'local');
