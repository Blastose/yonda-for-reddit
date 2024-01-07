<script lang="ts">
	export let data;
</script>

<div>
	<p>Comments</p>
	{#await data.submission}
		<p>Loading...</p>
	{:then submission}
		{#each submission.comments as c}
			<p>{c.type === 'comment' ? c.body : ''}</p>
		{/each}
	{/await}
</div>
