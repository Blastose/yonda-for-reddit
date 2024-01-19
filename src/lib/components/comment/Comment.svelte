<script lang="ts">
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { CommentFull, Sort } from 'jsrwrap/types';
	import CommentBar from './CommentBar.svelte';
	import { tick } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import Submitter from '../subreddit/Submitter.svelte';
	import { formatter } from '$lib/reddit/number';
	import { jsrwrap } from '$lib/reddit/reddit';
	import { buildCommentThreadPermalink } from '$lib/url/url';
	import { page } from '$app/stores';

	export let comment: CommentFull;
	export let pageSort: Sort | undefined;
	export let suggestedSort: Sort | null;
	export let submissionId: string;
	export let updateReplies: ((moreId: string, children: CommentFull[]) => void) | null = null;
	export let persistSubmission: () => void;

	let commentContainer: HTMLDivElement;
	$: commentBody = comment.type === 'comment' ? comment.body : '';
	$: commentMediaMetadata = comment.type === 'comment' ? comment.media_metadata : undefined;
	$: commentHtml = markdownToHtml(commentBody, { media_metadata: commentMediaMetadata });
	$: highlightCommentId = $page.params.commentId;
	let loadingMoreComments = false;

	async function toggleCommentVisibility() {
		if (comment.type === 'comment') {
			comment.collapsed = !comment.collapsed;

			if (comment.collapsed) {
				await tick();
				const rect = commentContainer.getBoundingClientRect();
				if (rect.top < 56 + 3) {
					// 56px is the height of the fixed header
					commentContainer.scrollIntoView();
				}
			}
		}
		persistSubmission();
	}

	async function getMoreChildren() {
		if (comment.type === 'more' && comment.id !== '_') {
			loadingMoreComments = true;
			const sort = pageSort ?? suggestedSort ?? 'confidence';
			const children = await jsrwrap.getSubmission(submissionId).getMoreChildren({
				children: comment.children,
				limit_children: false,
				sort
			});
			if (updateReplies) updateReplies(comment.id, children);
			loadingMoreComments = false;
		}
	}

	function addReplies(moreId: string, children: CommentFull[]) {
		if (comment.type === 'comment') {
			const moreIndex = comment.replies.findIndex((value) => value.id === moreId);
			comment.replies.splice(moreIndex, 1);
			comment.replies = comment.replies.concat(children);
			persistSubmission();
		}
	}
</script>

{#if comment.type === 'comment'}
	<div class="comment-container" bind:this={commentContainer}>
		<CommentBar commentHidden={comment.collapsed} {toggleCommentVisibility} />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col" class:highlight={highlightCommentId === comment.id}>
				<div class="flex items-start gap-2">
					<Submitter submitter={comment} type="comment" />
					{#if comment.collapsed}
						<button
							class="flex items-center gap-2 whitespace-nowrap text-sm"
							on:click={toggleCommentVisibility}
							aria-label="open comment"
						>
							<span class="text-xs">{comment.score_hidden ? '•' : `${comment.score} points`}</span>
							[ + ]
						</button>
					{/if}
				</div>

				{#if !comment.collapsed}
					<div class="flex flex-col">
						<div class="comment-body-container image-left grid grid-cols-1">
							<RedditHtml rawHTML={commentHtml} />
						</div>

						<div class="flex flex-wrap gap-1 text-sm font-semibold">
							<div class="flex w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]">
								<button><Icon name="arrowUpOutline" /></button>
								<span title={comment.score.toString()}
									>{comment.score_hidden ? '•' : formatter.format(comment.score)}</span
								>
								<button><Icon name="arrowDownOutline" /></button>
							</div>

							<button
								class="flex h-full w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]"
							>
								<span class="flex h-[24px] items-center">
									<Icon name="comment" height="20" width="20" />
								</span>
								<span class="flex gap-2 text-xs">Reply</span>
							</button>
						</div>
					</div>
				{/if}
			</div>

			{#if comment.replies.length > 0}
				<div class="flex flex-col gap-4" class:hidden={comment.collapsed}>
					{#each comment.replies as reply (reply.id)}
						<svelte:self
							comment={reply}
							{pageSort}
							{suggestedSort}
							{submissionId}
							updateReplies={addReplies}
							{persistSubmission}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else if comment.type === 'more'}
	{#if comment.id === '_'}
		<a
			class="load-more-comments"
			href={buildCommentThreadPermalink(comment.parent_id, $page.url.pathname)}
			rel="noreferrer">Continue this thread</a
		>
	{:else}
		<button
			class="load-more-comments text-left text-sm"
			on:click={getMoreChildren}
			disabled={loadingMoreComments}
		>
			{loadingMoreComments ? 'Loading...' : `Load ${comment.count} more comments`}
		</button>
	{/if}
{/if}

<style>
	.comment-container {
		display: grid;
		grid-template-columns: 22px 1fr;
		scroll-margin-top: 65px;
	}

	.load-more-comments {
		color: var(--link-color);
	}

	.highlight {
		background-color: rgba(84, 85, 88, 0.267);
		border-radius: 0.375rem;
		padding: 0.125rem 0.5rem;
	}
</style>
