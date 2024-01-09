import { readable } from 'svelte/store';

function createNowStore() {
	const startingTime = new Date();

	return readable(startingTime, (set) => {
		const minuteInMs = 60000;

		const interval = setInterval(() => {
			set(new Date());
		}, minuteInMs);

		return () => {
			clearInterval(interval);
		};
	});
}

export const nowStore = createNowStore();
