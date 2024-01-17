import { writable } from "svelte/store";

export const submissionDisplayStore = writable<'card' | 'classic'>('classic');