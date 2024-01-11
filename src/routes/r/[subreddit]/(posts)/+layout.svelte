<script lang="ts">
	import { page } from '$app/stores';
	import SubTestCont from '$lib/components/layout/SubTestCont.svelte';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';
	import { db } from '$lib/idb/idb.js';
	import type { SubredditSort } from '$lib/reddit/reddit.js';

	export let data;

	$: {
		$page;
		(async () => {
			const submissions = await data.submissions;
			console.log(submissions);
			await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
		})();
	}

	$: sort = ($page.params.sort ?? 'hot') as SubredditSort;
</script>

{#key getFullUrl($page.url)}
	{#await data.submissions}
		<p>Loading....</p>
	{:then submissions}
		<div>
			<SubTestCont {submissions} subreddit={$page.params.subreddit} {sort} />
		</div>
	{/await}
{/key}

<!-- This slot does not display any content, but is needed to silence a SK warning -->
<slot />
