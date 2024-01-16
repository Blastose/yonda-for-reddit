<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import { setSubmissionStore } from '$lib/stores/submissionStore';
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
</script>

<ClickableDivWrapper
	{href}
	onClick={() => {
		setSubmissionStore(href, submission);
	}}
>
	<article class="flex flex-col gap-4">
		<div class="grid grid-cols-[86px_1fr] gap-2">
			<div>
				<ClassicThumbnail {submission} {hasThumbnail} handleClick={toggleOpen} />
			</div>

			<div class="flex flex-col gap-1">
				<div class="gap-1">
					<div class="flex gap-1">
						<Flair linkFlair={submission} />
						<Tag postTag={submission} />
					</div>
					<h2 class="font-bold">
						{submission.title}
					</h2>
				</div>
				<Submitter submitter={submission} type="submission" />

				<SubmissionActions {submission} {numNewComments} type="subreddit" />
			</div>
		</div>
		{#if open}
			<div>
				<Embed {submission} />
			</div>
			<RedditHtml
				rawHTML={markdownToHtml(submission.selftext, { media_metadata: submission.media_metadata })}
			/>
		{/if}
	</article>
</ClickableDivWrapper>

<style>
	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: rgb(36, 36, 36);
	}
</style>
