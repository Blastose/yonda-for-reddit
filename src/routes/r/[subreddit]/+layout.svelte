<script lang="ts">
	import { page } from '$app/stores';
	import Banner from '$lib/components/subreddit/Banner.svelte';

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
<div>
	{data.about.display_name_prefixed}
	{#await data.sidebarPromise then sidebar}
		{sidebar.at(0)?.id}
	{/await}
</div>

<slot />
