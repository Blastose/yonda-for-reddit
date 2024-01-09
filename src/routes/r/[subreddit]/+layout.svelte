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

<p>
	<a href="/r/genshin_impact">/r/genshin_impact</a>
	<a href="/r/games">/r/games</a>
	<a href="/r/webdev">/r/webdev</a>
	<a href="/">Home</a>
</p>

<Banner about={data.about} />

<div class="grid grid-cols-[1fr_256px]">
	<div>
		<slot />
	</div>

	{#await data.sidebarPromise}
		<p>Loading sidebar...</p>
	{:then widgets}
		<div class="thin-scrollbar sticky top-16 h-[calc(100dvh-56px)] overflow-y-auto">
			<SubredditSidebar about={data.about} {widgets} />
		</div>
	{/await}
</div>
