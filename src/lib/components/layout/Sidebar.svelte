<script lang="ts">
	export let type: 'sidebar' | 'drawer';
</script>

<div class="thin-scrollbar {type === 'sidebar' ? 'sidebar' : 'drawer'} ">
	{#each { length: 50 } as _}
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
