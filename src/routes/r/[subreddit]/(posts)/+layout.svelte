<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SubTestCont from '$lib/components/layout/SubTestCont.svelte';

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
	<SubTestCont {submissions} subreddit={$page.params.subreddit} />
{/await}

<slot />
