<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import { setSubmissionStore, submissionStoreClick } from '$lib/stores/submissionStore';
	import { formatSubmissionPermalink } from '$lib/url/url';
	import SubmissionActions from './SubmissionActions.svelte';
	import Flair from './Flair.svelte';
	import Tag from './Tag.svelte';
	import Submitter from './Submitter.svelte';
	import ClassicThumbnail from './ClassicThumbnail.svelte';
	import Embed from './embed/Embed.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';

	export let submission: SubmissionData;
	$: href = formatSubmissionPermalink(submission.permalink);
	let numNewComments: number = 0;

	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', 'image', ''];
	$: hasThumbnail = !nonThumbnailSrcs.includes(submission.thumbnail);

	let open = false;
	function toggleOpen() {
		open = !open;
	}

	function handleKeydown(node: HTMLElement) {
		function hk(e: KeyboardEvent) {
			if (e.key==="k") {
					toggleOpen();
			}
		}
		node.addEventListener('keydown', hk);
		return {
			destroy() {
				node.removeEventListener('keydown', hk)
			}
		}
	}
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
						<Flair linkFlair={submission} />
						<Tag postTag={submission} />
					</div>
					<a
						use:submissionStoreClick={{ url: href, submission }}
						{href}
						class="submission-title font-bold"
					>
						{submission.title}
						<span class="text-sm font-normal text-neutral-500">({submission.domain})</span>
					</a>
				</div>
				<Submitter submitter={submission} type="submission" />

				<SubmissionActions {submission} {numNewComments} type="subreddit" />
			</div>
		</div>
		{#if open}
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
		background-color: rgb(36, 36, 36);
	}
</style>
