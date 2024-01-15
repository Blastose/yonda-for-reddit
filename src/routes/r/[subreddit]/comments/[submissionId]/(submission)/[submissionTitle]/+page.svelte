<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import CommentSort from '$lib/components/comment/CommentSort.svelte';
	import { db } from '$lib/idb/idb.js';
	import { setSubmissionStore } from '$lib/stores/submissionStore.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';
	import { page } from '$app/stores';

	export let data;
</script>

<div>
	{#await data.submission}
		<div class="flex flex-col gap-8">
			{#each { length: 5 } as _}
				<CommentSkeleton />
			{/each}
		</div>
	{:then submission}
		{@const persistSubmission = () => {
			setSubmissionStore(transformUrlForIDBKey($page.url), submission);
			db.put('subredditv2', submission, transformUrlForIDBKey($page.url));
		}}
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
				<Comment
					{comment}
					pageSort={data.sort}
					suggestedSort={submission.suggested_sort}
					submissionId={submission.id}
					updateReplies={(moreId, children) => {
						const moreIndex = submission.comments.findIndex((v) => v.id === moreId);
						console.log(moreIndex);
						submission.comments.splice(moreIndex, 1);
						submission.comments = submission.comments.concat(children);
					}}
					{persistSubmission}
				/>
				{#if index < submission.comments.length - 1}
					<div class="flex justify-center">
						<hr class="w-2/3 border-[#3a3a3a]" />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
</div>
