<script lang="ts">
	import Pagination from '$lib/components/reddit/Pagination.svelte';
	import Creations from '$lib/components/reddituser/Creations.svelte';
	import CreationsSort from '$lib/components/reddituser/CreationsSort.svelte';

	export let data;
</script>

<div class="flex flex-col gap-4">
	{#await data.creations then creation}
		<CreationsSort username={data.username} />

		<Creations
			creations={{
				data: creation.data,
				type: 'both'
			}}
		/>

		<Pagination
			before={creation.before}
			after={creation.after}
			count={data.count}
			dist={creation.dist}
		/>
	{/await}
</div>
