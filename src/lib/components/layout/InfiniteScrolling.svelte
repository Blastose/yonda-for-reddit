<script lang="ts" generics="T">
	import { onMount } from 'svelte';

	export let results: Array<T>;
	export let fetchMoreResults: () => Promise<T[]>;
	export let onSuccess: () => Promise<void>;
	export let noMoreSearchResults: boolean = false;
	let loadingElement: HTMLDivElement;
	let loadingSearchResults = false;

	onMount(() => {
		const interactionObserver = new IntersectionObserver(async (entries) => {
			if (entries[0].intersectionRatio <= 0) return;

			if (loadingSearchResults) return;

			loadingSearchResults = true;
			try {
				const searchResults = await fetchMoreResults();
				if (searchResults.length === 0) {
					noMoreSearchResults = true;
					return;
				}
				results = results.concat(searchResults);
				await onSuccess();
				console.log(searchResults);
				console.log(results);
			} catch (e) {
				console.log(e);
			}
			loadingSearchResults = false;
		});

		interactionObserver.observe(loadingElement);

		return () => {
			interactionObserver.unobserve(loadingElement);
		};
	});
</script>

<div class:hidden={noMoreSearchResults} bind:this={loadingElement}>
	<p>Loading...</p>
</div>
