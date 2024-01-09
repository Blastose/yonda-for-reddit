<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/idb/idb.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';

	export let data;

	$: {
		$page;
		(async () => {
			const submission = await data.submission;
			db.put('subredditv2', submission, transformUrlForIDBKey($page.url));
		})();
	}
</script>

{#await data.submission}
	<p>Loading....</p>
{:then submission}
	<div>
		{submission.num_comments}
	</div>
{/await}

<slot />
