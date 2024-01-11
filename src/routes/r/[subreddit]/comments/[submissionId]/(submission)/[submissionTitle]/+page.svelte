<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';
	import CommentSort from '$lib/components/comment/CommentSort.svelte';

	export let data;
</script>

<div>
	{#await data.submission}
		<p>Loading...</p>
	{:then submission}
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-2">
				<CommentSort {submission} />

				<input
					class="w-full rounded-3xl bg-[var(--search-input-bg)] px-4 py-2"
					type="text"
					placeholder="Add a comment"
				/>
			</div>

			{#each submission.comments as comment, index}
				<Comment {comment} />
				{#if index < submission.comments.length - 1}
					<div class="flex justify-center">
						<hr class="w-2/3 border-[#3a3a3a]" />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
</div>
