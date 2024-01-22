<script lang="ts">
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import SubmissionCommentsContainer from '$lib/components/subreddit/SubmissionCommentsContainer.svelte';
	import SubmissionTitle from '../SubmissionTitle.svelte';

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
		<SubmissionTitle subreddit={submission.subreddit} title={submission.title} />
		<SubmissionCommentsContainer {submission} sort={data.sort} />
	{/await}
</div>
