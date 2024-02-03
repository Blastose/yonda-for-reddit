import { writable } from 'svelte/store';

export const loggedInStore = writable<string | null>(null);
