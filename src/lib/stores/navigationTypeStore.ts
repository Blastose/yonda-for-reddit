import { writable } from 'svelte/store';

// TODO This doesn't need to be a store
export const navigationTypeStore = writable<'bfbutton' | null>(null);
