<script lang="ts">
	import CommentSort from '../comment/CommentSort.svelte';
	import Comment from '../comment/Comment.svelte';
	import type { Comment as CommentT } from 'jsrwrap/types';
	import type { SubmissionFull } from '$lib/reddit/reddit';
	import type { Sort } from 'jsrwrap/types';
	import { setSubmissionStore } from '$lib/stores/submissionStore';
	import { transformUrlForIDBKey } from '$lib/url/url';
	import { page } from '$app/stores';
	import { db } from '$lib/idb/idb';
	import CommentRefresh from '../comment/CommentRefresh.svelte';
	import SingleCommentThread from '../comment/SingleCommentThread.svelte';
	import Hr from '../layout/Hr.svelte';
	import CommentInput from '../actions/CommentInput.svelte';
	import { loggedInStore } from '$lib/stores/loggedInStore';

	export let submission: SubmissionFull;
	export let sort: Sort | undefined;
	export let singleCommentThread: boolean = false;

	const persistSubmission = () => {
		setSubmissionStore(transformUrlForIDBKey($page.url), submission);
		db.put('submission', submission, transformUrlForIDBKey($page.url));
	};

	function handleComment(c: CommentT & { type: 'comment' }) {
		submission.comments.unshift(c);
		submission = submission;
		persistSubmission();
	}

	let commentsContainer: HTMLDivElement;
	function jumpToComments(e: KeyboardEvent) {
		if (e.key === 'c') {
			const nodeName = document.activeElement?.nodeName;
			if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') {
				commentsContainer.scrollIntoView();
			}
		}
	}
</script>

<svelte:window on:keydown={jumpToComments} />

<div bind:this={commentsContainer} class="comments-container flex flex-col gap-8">
	<div class="flex max-w-4xl flex-col gap-2">
		<CommentSort {submission} />

		{#if !singleCommentThread}
			<CommentRefresh bind:submission submissionId={submission.id} {sort} {persistSubmission} />
		{:else}
			<SingleCommentThread {submission} />
		{/if}

		{#if !singleCommentThread && $loggedInStore && !submission.archived && !submission.locked}
			<CommentInput thingId={submission.name} afterComment={handleComment} type="comment" />
		{/if}
	</div>

	{#each submission.comments as comment, index}
		<Comment
			preventReplies={submission.locked || submission.archived}
			preventVotes={submission.archived}
			{comment}
			pageSort={sort}
			suggestedSort={submission.suggested_sort}
			submissionId={submission.id}
			updateReplies={(moreId, children) => {
				const moreIndex = submission.comments.findIndex((v) => v.id === moreId);
				submission.comments.splice(moreIndex, 1);
				submission.comments = submission.comments.concat(children);
			}}
			{persistSubmission}
		/>
		{#if index < submission.comments.length - 1}
			<div class="flex justify-center">
				<Hr class="w-2/3"></Hr>
			</div>
		{/if}
	{/each}
</div>

<style>
	.comments-container {
		scroll-margin-top: var(--header-height);
	}
</style>
