<script lang="ts">
	import { page } from '$app/stores';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';
	import { db } from '$lib/idb/idb.js';

	export let data;

	$: subreddit = $page.params.subreddit;

	$: {
		subreddit;
		(async () => {
			const sidebar = await data.sidebarPromise;
			if (Array.isArray(sidebar)) {
				// Need to check if it is an array since we may get an error {message: 'Internal Error'}
				db.put('subredditSidebar', { cached: new Date().getTime(), value: sidebar }, subreddit);
			}

			const moderators = await data.moderators;
			if (moderators) {
				db.put(
					'subredditModerators',
					{ cached: new Date().getTime(), value: moderators },
					subreddit
				);
			}
		})();
	}
</script>

<svelte:head><title>{data.about?.title ?? subreddit}</title></svelte:head>

<Subreddit
	about={data.about}
	sidebarPromise={data.sidebarPromise}
	moderatorsPromise={data.moderators}
>
	<slot />
</Subreddit>
