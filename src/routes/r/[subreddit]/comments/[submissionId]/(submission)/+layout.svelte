<script lang="ts">
	export let data;
</script>

{#await data.submission}
	<p>Loading....</p>
{:then submission}
	<div>
		{submission.num_comments}
	</div>
{/await}

<slot />
