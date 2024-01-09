<script lang="ts">
	import { page } from '$app/stores';
	import SubTestCont from '$lib/components/layout/SubTestCont.svelte';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';
	import { db } from '$lib/idb/idb.js';

	export let data;

	$: {
		$page;
		(async () => {
			const submissions = await data.submissions;
			await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
		})();
	}
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
