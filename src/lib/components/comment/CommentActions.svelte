<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { Comment } from 'jsrwrap/types';
	import CommentMoreOptions from './CommentMoreOptions.svelte';
	import VoteActions from '../actions/VoteActions.svelte';

	export let comment: Comment & { type: 'comment' };
	export let persistSubmission: () => void;
</script>

<div class="flex flex-wrap gap-1 text-sm font-semibold">
	<VoteActions votable={comment} type="comment" persistVote={persistSubmission} />

	<button class="flex h-full w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]">
		<span class="flex h-[24px] items-center">
			<Icon name="comment" height="20" width="20" />
		</span>
		<span class="flex gap-2 text-xs">Reply</span>
	</button>

	<CommentMoreOptions {comment} />
</div>
