import { writable } from 'svelte/store';

export const navigationTypeStore = writable<'bfbutton' | null>(null);
