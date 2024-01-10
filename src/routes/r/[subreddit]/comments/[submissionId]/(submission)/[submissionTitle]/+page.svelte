<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';

	export let data;
</script>

<hr />
<div>
	{#await data.submission}
		<p>Loading...</p>
	{:then submission}
		<div class="flex flex-col gap-8">
			{#each submission.comments as comment}
				<Comment {comment} />
				<div class="flex justify-center">
					<hr class="w-2/3 border-[#3a3a3a]" />
				</div>
			{/each}
		</div>
	{/await}
</div>
