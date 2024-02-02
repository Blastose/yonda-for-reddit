<script lang="ts">
	import type { CommentFull } from 'jsrwrap/types';
	import RelativeTime from '../subreddit/RelativeTime.svelte';
	import { formatSubmissionPermalink } from '$lib/url/url';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import CommentActions from './CommentActions.svelte';

	export let comment: CommentFull & { type: 'comment' };
	$: href = `${formatSubmissionPermalink(comment.permalink)}?context=3`;
</script>

<ClickableDivWrapper {href}>
	<article class="flex flex-col gap-1 px-4 py-2">
		<div class="flex flex-col gap-1">
			<p class="text-xs font-semibold">
				<a class="hover:underline" href={formatSubmissionPermalink(comment.permalink)}
					>{comment.link_title}</a
				>
				•
				<a
					class="text-[var(--reddit-username-color)] hover:underline"
					href="/r/{comment.subreddit.toLowerCase()}">r/{comment.subreddit}</a
				>
			</p>

			<p class="text-sm">
				<a class="font-semibold text-[var(--reddit-username-color)]" href="/u/{comment.author}"
					>{comment.author}</a
				>
				<span class="text-xs">
					commented <RelativeTime
						postedTimeSeconds={comment.created_utc}
						editedTimeSeconds={comment.edited}
					/>
				</span>
			</p>
		</div>

		<RedditHtml
			rawHTML={markdownToHtml(comment.body, { media_metadata: comment.media_metadata })}
		/>

		<CommentActions {comment} persistSubmission={() => {}} />
	</article>
</ClickableDivWrapper>

<style>
	/* TODO refactor with other cards */
	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: var(--bg-hover);
	}
</style>
