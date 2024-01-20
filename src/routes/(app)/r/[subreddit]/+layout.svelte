<script lang="ts">
	import { page } from '$app/stores';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';

	export let data;

	$: subreddit = $page.params.subreddit;
</script>

<svelte:head><title>{data.about?.title ?? subreddit}</title></svelte:head>

<Subreddit about={data.about} sidebarPromise={data.sidebarPromise}>
	<slot />
</Subreddit>
