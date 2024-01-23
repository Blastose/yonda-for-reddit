<script lang="ts">
	import { submissionStore } from '$lib/stores/submissionStore';
	import SubmissionInfo from '$lib/components/subreddit/SubmissionInfo.svelte';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';
	import type { SubmissionFull } from '$lib/reddit/reddit';
	import type { MaybePromise } from '@sveltejs/kit';
	import { page } from '$app/stores';

	export let submissionPromise: MaybePromise<SubmissionFull>;

	$: submissionId = $page.params.submissionId;
</script>

<div class="flex flex-col gap-8">
	{#if $submissionStore && submissionId === $submissionStore.submission.id}
		{@const submission = $submissionStore.submission}
		<SubmissionInfo {submission} type="submission" numNewComments={0} />
	{:else}
		{#await submissionPromise}
			<SubmissionSkeleton padding={false} />
		{:then submission}
			<SubmissionInfo {submission} type="submission" numNewComments={0} />
		{/await}
	{/if}

	<slot />
</div>
