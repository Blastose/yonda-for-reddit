<script lang="ts">
	import { page } from '$app/stores';
	import Banner from '$lib/components/subreddit/Banner.svelte';
	import SortTime from '$lib/components/subreddit/SortTime.svelte';
	import SubredditSort from '$lib/components/subreddit/SubredditSort.svelte';
	import SubredditSidebar from '$lib/components/subreddit/sidebar/SubredditSidebar.svelte';

	export let data;

	// We show the hot, new, rising, etc. buttons if the page isn't a comment thread
	$: showSubredditOptions = !/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/.*?$/.test(
		$page.url.toString()
	);
</script>

<svelte:head><title>{data.about.title}</title></svelte:head>

<div class="flex flex-col gap-4 pt-2">
	<Banner about={data.about} />

	<div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_312px]">
		<div class="flex flex-col gap-2">
			{#if showSubredditOptions}
				<div class="flex gap-2 self-end">
					<SubredditSort />
					<SortTime />
				</div>
			{/if}

			<slot />
		</div>

		{#await data.sidebarPromise}
			<p>Loading sidebar...</p>
		{:then widgets}
			<div
				class="subreddit-sidebar thin-scrollbar sticky top-16 hidden h-[calc(100dvh-100px)] overflow-y-auto md:block"
			>
				<SubredditSidebar about={data.about} {widgets} />
			</div>
		{/await}
	</div>
</div>

<style>
	.subreddit-sidebar {
		view-transition-name: subreddit-sidebar;
	}
</style>
