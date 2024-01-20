<script lang="ts">
	import { page } from '$app/stores';
	import Banner from '$lib/components/subreddit/Banner.svelte';
	import SortTime from '$lib/components/subreddit/SortTime.svelte';
	import SubredditSort from '$lib/components/subreddit/SubredditSort.svelte';
	import SubredditSidebar from '$lib/components/subreddit/sidebar/SubredditSidebar.svelte';
	import type { SubredditData, Widget } from 'jsrwrap/types';

	export let about: SubredditData | null;
	export let sidebarPromise: Promise<Widget[]> | null;

	// We show the hot, new, rising, etc. buttons if the page isn't a comment thread
	$: showSubredditOptions =
		!/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/.*?$/.test($page.url.toString()) ||
		$page.url.pathname === '/' ||
		$page.params.sort;

	$: subreddit = $page.params.subreddit;
	$: fallbackSubreddit = subreddit ? `r/${subreddit}` : null;
</script>

<div class="flex flex-col gap-4 pt-2">
	<Banner {about} {fallbackSubreddit} />

	<div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_312px]">
		<div class="flex max-w-[750px] flex-col gap-2">
			{#if showSubredditOptions}
				<div class="flex">
					<SubredditSort />
					<SortTime />
				</div>
			{/if}

			<slot />
		</div>

		{#if sidebarPromise && about}
			{#await sidebarPromise}
				<p>Loading sidebar...</p>
			{:then widgets}
				<div
					class="subreddit-sidebar thin-scrollbar sticky top-16 hidden h-[calc(100dvh-100px)] overflow-y-auto md:block"
				>
					<SubredditSidebar {about} {widgets} />
				</div>
			{/await}
		{:else}
			<div></div>
		{/if}
	</div>
</div>

<style>
	.subreddit-sidebar {
		view-transition-name: subreddit-sidebar;
	}
</style>
