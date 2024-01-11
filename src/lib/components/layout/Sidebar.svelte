<script lang="ts">
	export let type: 'sidebar' | 'drawer';
</script>

<div class="thin-scrollbar {type === 'sidebar' ? 'sidebar' : 'drawer'} ">
	<p>
		<a href="/r/genshin_impact">/r/genshin_impact</a>
	</p>
	<p>
		<a href="/r/games">/r/games</a>
	</p>
	<p>
		<a href="/r/webdev">/r/webdev</a>
	</p>
	<p>
		<a href="/r/WebdeV">/r/WebdeV</a>
	</p>
	<p>
		<a href="/r/genshin_impact_leaks">/r/genshin_impact_leaks</a>
	</p>
	<p>
		<a href="/">Home</a>
	</p>

	{#each { length: 47 } as _}
		<p>Sidebar</p>
	{/each}
</div>

<style>
	div {
		overflow-y: auto;
		width: 100%;
	}

	div.sidebar {
		height: 100%;
		padding: 1rem;
	}

	div.drawer {
		height: calc(100dvh - 2rem);
		padding: 0rem 1rem;
	}
</style>
