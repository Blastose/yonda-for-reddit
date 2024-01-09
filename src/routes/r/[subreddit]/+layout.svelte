<script lang="ts">
	import { page } from '$app/stores';
	import Banner from '$lib/components/subreddit/Banner.svelte';
	import SubredditSidebar from '$lib/components/subreddit/sidebar/SubredditSidebar.svelte';

	export let data;

	// We show the hot, new, rising, etc. buttons if the page isn't a comment thread
	$: showSubredditOptions = !/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/.*?$/.test(
		$page.url.toString()
	);
</script>

<Banner about={data.about} />

<div class="grid grid-cols-[1fr_312px] gap-4">
	<div>
		<slot />
	</div>

	{#await data.sidebarPromise}
		<p>Loading sidebar...</p>
	{:then widgets}
		<div
			class="subreddit-sidebar thin-scrollbar sticky top-16 h-[calc(100dvh-100px)] overflow-y-auto"
		>
			<SubredditSidebar about={data.about} {widgets} />
		</div>
	{/await}
</div>

<style>
	.subreddit-sidebar {
		view-transition-name: subreddit-sidebar;
	}
</style>
