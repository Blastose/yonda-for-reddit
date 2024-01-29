<script lang="ts">
	import Pagination from '$lib/components/reddit/Pagination.svelte';
	import Creations from '$lib/components/reddituser/Creations.svelte';

	export let data;
</script>

<svelte:head><title>{data.about.name} (u/{data.about.name})</title></svelte:head>

<div class="flex flex-col gap-4">
	{#await data.overview then overview}
		<Creations creations={{ data: overview.data, type: 'both' }} />

		<Pagination
			before={overview.before}
			after={overview.after}
			count={data.count}
			dist={data.overview.dist}
		/>
	{/await}
</div>
