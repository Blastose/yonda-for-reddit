<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { formatSubmissionPermalink } from '$lib/url/url';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import Embed from './embed/Embed.svelte';
	import { db } from '$lib/idb/idb';
	import { setSubmissionStore } from '$lib/stores/submissionStore';
	import SubmissionActions from './SubmissionActions.svelte';
	import SubmissionInfo from './SubmissionInfo.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import { hasEmbed } from './embed/embed';
	import CardThumbnail from './CardThumbnail.svelte';
	import ObfuscatedOverlay from './embed/ObfuscatedOverlay.svelte';
	import { getSubmissionObfuscatedType } from './submission';

	export let submission: SubmissionData;
	$: href = formatSubmissionPermalink(submission.permalink);

	async function getCommentCount() {
		return (await db.get('submissionCommentCount', submission.id)) ?? submission.num_comments;
	}

	let numNewComments: number = 0;
	$: (async () => {
		numNewComments = submission.num_comments - (await getCommentCount());
	})();

	function showThumbnail(submission: SubmissionData) {
		return Boolean(
			submission.thumbnail &&
				submission.thumbnail !== 'nsfw' &&
				submission.thumbnail !== 'spoiler' &&
				submission.thumbnail !== 'default' &&
				submission.post_hint === 'link' &&
				!hasEmbed(submission)
		);
	}

	$: obfuscatedType = getSubmissionObfuscatedType(submission);
</script>

<ClickableDivWrapper
	{href}
	onClick={() => {
		setSubmissionStore(href, submission);
	}}
>
	<article class="flex flex-col gap-2">
		<div
			class="grid gap-4 {showThumbnail(submission)
				? 'grid-cols-[1fr_112px] sm:grid-cols-[1fr_128px]'
				: ''}"
		>
			<SubmissionInfo {submission} type="subreddit" />
			{#if showThumbnail(submission)}
				<div>
					<CardThumbnail {submission} />
				</div>
			{/if}
		</div>

		<ObfuscatedOverlay type={obfuscatedType}>
			<Embed {submission} />
			{#if submission.selftext}
				<div class="selftext max-h-24 overflow-hidden text-sm">
					<RedditHtml rawHTML={markdownToHtml(submission.selftext)} />
				</div>
			{/if}
		</ObfuscatedOverlay>

		<SubmissionActions {submission} {numNewComments} type="subreddit" />
	</article>
</ClickableDivWrapper>

<style>
	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: var(--bg-hover);
	}

	.selftext {
		position: relative;
		overflow: hidden;
	}

	.selftext::after {
		content: '';
		width: 100%;
		height: 2.5rem;
		position: absolute;
		left: 0;
		bottom: 0;
		background-image: linear-gradient(to bottom, #ffffff00, var(--bg));
	}

	article:hover .selftext::after {
		background-image: linear-gradient(to bottom, #ffffff00, var(--bg-hover));
	}
</style>
