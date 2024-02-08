<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import { setSubmissionStore, submissionStoreClick } from '$lib/stores/submissionStore';
	import { formatSubmissionPermalink, showSubreddit } from '$lib/url/url';
	import SubmissionActions from './SubmissionActions.svelte';
	import Flair from './Flair.svelte';
	import Tag from './Tag.svelte';
	import Submitter from './Submitter.svelte';
	import ClassicThumbnail from './ClassicThumbnail.svelte';
	import Embed from './embed/Embed.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import { page } from '$app/stores';
	import { db } from '$lib/idb/idb';

	export let submission: SubmissionData;
	$: href = formatSubmissionPermalink(submission.permalink);
	let numNewComments: number = 0;
	async function getCommentCount() {
		return (await db.get('submissionCommentCount', submission.id)) ?? submission.num_comments;
	}
	$: (async () => {
		numNewComments = submission.num_comments - (await getCommentCount());
	})();

	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', 'image', ''];
	$: hasThumbnail = !nonThumbnailSrcs.includes(submission.thumbnail);

	let open = false;
	function toggleOpen() {
		open = !open;
	}

	function handleKeydown(node: HTMLElement) {
		function hk(e: KeyboardEvent) {
			if (e.key === 'k') {
				toggleOpen();
			}
		}
		node.addEventListener('keydown', hk);
		return {
			destroy() {
				node.removeEventListener('keydown', hk);
			}
		};
	}

	$: showSubreddit2 = showSubreddit($page.url.pathname, $page.params.subreddit);
</script>

<ClickableDivWrapper
	{href}
	onClick={() => {
		setSubmissionStore(href, submission);
	}}
>
	<article use:handleKeydown class="flex flex-col gap-4">
		<div class="grid {submission.thumbnail !== '' ? 'grid-cols-[86px_1fr]' : ''} gap-2 sm:gap-4">
			{#if submission.thumbnail !== ''}
				<div>
					<ClassicThumbnail {submission} {hasThumbnail} handleClick={toggleOpen} />
				</div>
			{/if}

			<div class="flex flex-col gap-1">
				<div class="gap-1">
					<div class="flex gap-1">
						<Flair linkFlair={submission} subreddit={submission.subreddit} />
						<Tag postTag={submission} />
					</div>
					<a
						use:submissionStoreClick={{ url: href, submission }}
						{href}
						class="submission-title font-bold"
					>
						{submission.title}
						<span class="text-sm font-normal text-[var(--visited-link-color)]"
							>({submission.domain})</span
						>
					</a>
				</div>
				<Submitter submitter={submission} type="submission" showSubreddit={showSubreddit2} />

				<SubmissionActions {submission} {numNewComments} type="subreddit" />
			</div>
		</div>
		{#if open}
			{#if submission.post_hint && submission.post_hint !== 'self' && submission.url}
				<a
					class="line-clamp-1 text-[var(--link-color)]"
					target="_blank"
					rel="noreferrer"
					href={submission.url}>{submission.url}</a
				>
			{/if}
			<Embed {submission} />
			{#if submission.selftext}
				<RedditHtml
					rawHTML={markdownToHtml(submission.selftext, {
						media_metadata: submission.media_metadata
					})}
				/>
			{/if}
		{/if}
	</article>
</ClickableDivWrapper>

<style>
	a.submission-title:visited {
		color: var(--visited-link-color);
	}

	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: var(--bg-hover);
	}
</style>
