<script lang="ts">
	export let data;
</script>

<p>
	<a href="/r/genshin_impact">/r/genshin_impact</a>
	<a href="/r/games">/r/games</a>
	<a href="/r/webdev">/r/webdev</a>
	<a href="/">Home</a>
</p>

<div>
	{data.about.display_name_prefixed}
	{#await data.sidebarPromise then sidebar}
		{sidebar.at(0)?.id}
	{/await}
</div>

<slot />
