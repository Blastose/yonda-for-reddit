<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { Comment, CommentFull } from 'jsrwrap/types';
	import CommentMoreOptions from './CommentMoreOptions.svelte';
	import VoteActions from '../actions/VoteActions.svelte';
	import CommentInput from '../actions/CommentInput.svelte';
	import { loggedInStore } from '$lib/stores/loggedInStore';

	export let comment: Comment & { type: 'comment' };
	export let persistSubmission: () => void;
	export let addReplyFromUser: (c: CommentFull) => void;

	function handleComment(c: Comment & { type: 'comment' }) {
		addReplyFromUser(c);
		showReplyComment = false;
	}
	let showReplyComment = false;
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-wrap gap-1 text-sm font-semibold">
		<VoteActions votable={comment} type="comment" persistVote={persistSubmission} />

		{#if $loggedInStore}
			<button
				on:click={() => {
					showReplyComment = !showReplyComment;
				}}
				class="flex h-full w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]"
			>
				<span class="flex h-[24px] items-center">
					<Icon name="comment" height="20" width="20" />
				</span>

				<span class="flex gap-2 text-xs">Reply</span>
			</button>
		{/if}

		<CommentMoreOptions {comment} />
	</div>

	{#if showReplyComment}
		<CommentInput thingId={comment.name} afterComment={handleComment} focus={true} />
	{/if}
</div>
