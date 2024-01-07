<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	onMount(async () => {
		const a = await data.submissions;
		console.log(a);
		localStorage.setItem($page.url.pathname + $page.url.search, JSON.stringify(a));
	});
</script>

{#await data.submissions}
	<p>Loading....</p>
{:then submissions}
	{#each submissions as submission}
		<p><a class="text-blue-500" href={submission.permalink.toLowerCase()}>{submission.title}</a></p>
	{/each}
{/await}
<slot />
