<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Flair from './Flair.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import { submissionStoreClick } from '$lib/stores/submissionStore';
	import { removeTrailingBackslashFromUrl } from '$lib/url/url';
	import SubmissionActions from './SubmissionActions.svelte';
	import Submitter from './Submitter.svelte';
	import Tag from './Tag.svelte';
	import Embed from './embed/Embed.svelte';

	export let submission: SubmissionData;
	export let type: 'subreddit' | 'submission';
	export let numNewComments: number = submission.num_comments;

	$: href = removeTrailingBackslashFromUrl(submission.permalink.toLowerCase());
</script>

<div class="flex flex-col gap-1">
	<div class="w-fit">
		<Flair linkFlair={submission} />
	</div>
	{#if type === 'subreddit'}
		<h2 class="text-xl font-bold">
			<a use:submissionStoreClick={{ url: href, submission }} class="submission-title" {href}
				>{submission.title}</a
			>
		</h2>
	{:else if type === 'submission'}
		<h1 class="text-2xl font-bold">{submission.title}</h1>
	{/if}
	<div class="flex w-fit flex-wrap gap-2">
		<Tag postTag={submission} />
	</div>
	<Submitter submitter={submission} type="submission" />

	{#if type === 'submission'}
		<Embed {submission} />
	{/if}

	{#if type === 'submission'}
		<div>
			<RedditHtml
				rawHTML={markdownToHtml(submission.selftext, {
					media_metadata: submission.media_metadata
				})}
			/>
		</div>
		<SubmissionActions {submission} {numNewComments} type="submission" />
	{/if}
</div>

<style>
	a.submission-title:visited {
		color: var(--visited-link-color);
	}
</style>