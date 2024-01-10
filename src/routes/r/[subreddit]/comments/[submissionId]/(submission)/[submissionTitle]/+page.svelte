<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';

	export let data;
</script>

<div>
	{#await data.submission}
		<p>Loading...</p>
	{:then submission}
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-2">
				<p class="text-sm">Sort By: {submission.suggested_sort}</p>
				<input
					class="w-full rounded-3xl bg-[var(--search-input-bg)] px-4 py-2"
					type="text"
					placeholder="Add a comment"
				/>
			</div>

			{#each submission.comments as comment}
				<Comment {comment} />
				<div class="flex justify-center">
					<hr class="w-2/3 border-[#3a3a3a]" />
				</div>
			{/each}
		</div>
	{/await}
</div>
