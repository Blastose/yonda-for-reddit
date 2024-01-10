<script lang="ts">
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { CommentFull } from 'jsrwrap/types';
	import CommentBar from './CommentBar.svelte';
	import { tick } from 'svelte';
	import RelativeTime from '../subreddit/RelativeTime.svelte';
	import Icon from '../icon/Icon.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import UserFlair from '../subreddit/UserFlair.svelte';
	import Hint from './Hint.svelte';

	export let comment: CommentFull;

	let commentContainer: HTMLDivElement;
	$: commentBody = comment.type === 'comment' ? comment.body : '';
	$: commentMediaMetadata = comment.type === 'comment' ? comment.media_metadata : undefined;
	$: commentHtml = markdownToHtml(commentBody, { media_metadata: commentMediaMetadata });

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
	}
</script>

{#if comment.type === 'comment'}
	<div class="comment-container" bind:this={commentContainer}>
		<CommentBar commentHidden={comment.collapsed} {toggleCommentVisibility} />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col">
				<div class="flex flex-wrap items-center gap-1">
					{#if comment.author !== '[deleted]'}
						<a href="/user/{comment.author}" class="text-sm font-semibold text-[#a1a5d8]"
							>{comment.author}</a
						>
					{:else}
						<p class="text-sm font-semibold text-[#a1a5d8]">{comment.author}</p>
					{/if}

					<UserFlair author={comment} />
					<Hint hint={comment} type={'comment'} />

					<span class="text-xs text-[var(visited-link-color)]"
						>•
						<RelativeTime
							postedTimeSeconds={comment.created_utc}
							editedTimeSeconds={comment.edited}
						/></span
					>
				</div>
				{#if !comment.collapsed}
					<div class="flex flex-col">
						<div class="grid grid-cols-1">
							<RedditHtml rawHTML={commentHtml} />
						</div>

						<div class="flex flex-wrap gap-1 text-sm font-semibold">
							<div
								class="-ml-2 flex w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]"
							>
								<button><Icon name="arrowUpOutline" /></button>
								<span class="">{comment.score}</span>
								<button><Icon name="arrowDownOutline" /></button>
							</div>

							<button
								class="flex h-full w-fit items-center gap-1 rounded-2xl px-2 py-1 hover:bg-[#2c2c2c]"
							>
								<div class="flex h-[24px] items-center">
									<Icon name="comment" height="20" width="20" />
								</div>
								<span class="flex gap-2 text-xs">Reply</span>
							</button>
						</div>
					</div>
				{/if}
			</div>

			{#if comment.replies.length > 0}
				<div class="flex flex-col gap-4" class:hidden={comment.collapsed}>
					{#each comment.replies as reply (reply.id)}
						<svelte:self comment={reply} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else if comment.type === 'more'}
	{#if comment.id === '_'}
		<a class="load-more-comments" href={'TODO'} rel="noreferrer">Continue this thread</a>
	{:else}
		<button class="load-more-comments text-left text-sm" disabled={true} on:click={async () => {}}>
			{false ? 'Loading...' : `Load ${comment.count} more comments`}
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
		color: rgb(140, 179, 253);
	}
</style>
