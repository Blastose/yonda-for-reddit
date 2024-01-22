import { writable, type Updater } from 'svelte/store';

// Adapted from https://github.com/CaptainCodeman/svelte-web-storage/blob/6d82108a6b40cf7a1f8c2be6b0760482c4aa05f5/src/lib/index.ts
export function persistedStore<T>(name: string, defaultValue: T, notify?: boolean) {
	const persisted = localStorage.getItem(name);
	const parsed = persisted ? JSON.parse(persisted) : null;

	let value: T =
		typeof defaultValue === 'object'
			? Array.isArray(defaultValue)
				? parsed ?? [...defaultValue]
				: { ...defaultValue, ...parsed }
			: persisted
				? parsed
				: defaultValue;

	const { subscribe, set: _set } = writable(value, () => {
		if (notify) {
			// eslint-disable-next-line svelte/no-inner-declarations, no-inner-declarations
			function handler(e: StorageEvent) {
				if (e.key === name) {
					_set((value = e.newValue ? JSON.parse(e.newValue) : defaultValue));
				}
			}

			addEventListener('storage', handler);
			return () => removeEventListener('storage', handler);
		}
	});

	function set(v: T) {
		_set((value = v));
		localStorage.setItem(name, JSON.stringify(value));
	}

	function update(updater: Updater<T>) {
		set(updater(value));
	}

	return {
		subscribe,
		set,
		update
	};
}
