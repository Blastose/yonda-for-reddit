<script lang="ts">
	export let data;
</script>

{#await data.submissions}
	<p>Loading....</p>
{:then submissions}
	{#each submissions as submission}
		<p><a class="text-blue-500" href={submission.permalink.toLowerCase()}>{submission.title}</a></p>
	{/each}
{/await}
<slot />
