<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SubTestCont from '$lib/components/layout/SubTestCont.svelte';
	import { getFullUrl } from '$lib/url/url.js';

	export let data;
</script>

{#key getFullUrl($page.url)}
	{#await data.submissions}
		<p>Loading....</p>
	{:then submissions}
		<SubTestCont {submissions} subreddit={$page.params.subreddit} />
	{/await}
{/key}

<!-- This slot does not display any content, but is needed to silence a SK warning -->
<slot />
