<script lang="ts">
	import { page } from '$app/stores';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import SubmissionCommentsContainer from '$lib/components/subreddit/SubmissionCommentsContainer.svelte';
	import { db } from '$lib/idb/idb';
	import { setSubmissionStore } from '$lib/stores/submissionStore';
	import { transformUrlForIDBKey } from '$lib/url/url';
	import SubmissionAndComment from '$lib/components/subreddit/SubmissionAndComment.svelte';
	import SubmissionTitle from '$lib/components/subreddit/SubmissionTitle.svelte';
	import JumpToComments from '$lib/components/comment/JumpToComments.svelte';

	export let data;

	$: singleCommentThread = Boolean($page.params.commentId);
	$: {
		$page;
		(async () => {
			const submission = await data.submissionSingleComment;
			setSubmissionStore(transformUrlForIDBKey($page.url), submission);
			db.put('submission', submission, transformUrlForIDBKey($page.url));
			db.put('submissionCommentCount', submission.num_comments, submission.id);
		})();
	}
</script>

<SubmissionAndComment submissionPromise={data.submissionSingleComment}>
	<div>
		<JumpToComments />
		{#await data.submissionSingleComment}
			<div class="flex flex-col gap-8">
				{#each { length: 5 } as _}
					<CommentSkeleton />
				{/each}
			</div>
		{:then submission}
			<SubmissionTitle
				commenter={'A redditor'}
				subreddit={submission.subreddit}
				title={submission.title}
			/>
			<SubmissionCommentsContainer {submission} sort={data.sort} {singleCommentThread} />
		{/await}
	</div>
</SubmissionAndComment>
