<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Flair from './Flair.svelte';
	import RedditHtml from '../reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import { submissionStoreClick } from '$lib/stores/submissionStore';
	import { formatSubmissionPermalink, showSubreddit } from '$lib/url/url';
	import SubmissionActions from './SubmissionActions.svelte';
	import Submitter from './Submitter.svelte';
	import Tag from './Tag.svelte';
	import Embed from './embed/Embed.svelte';
	import { page } from '$app/stores';

	export let submission: SubmissionData;
	export let type: 'subreddit' | 'submission';
	export let numNewComments: number = submission.num_comments;

	$: href = formatSubmissionPermalink(submission.permalink);
	$: showSubreddit2 = showSubreddit($page.url.pathname, $page.params.subreddit);
</script>

<div class="flex flex-col gap-1">
	{#if type === 'subreddit'}
		<h2 class="text-lg font-bold">
			<a use:submissionStoreClick={{ url: href, submission }} class="submission-title" {href}
				>{submission.title}</a
			>
		</h2>
	{:else if type === 'submission'}
		<h1 class="text-2xl font-bold">{submission.title}</h1>
	{/if}
	<div class="flex w-fit flex-wrap gap-2">
		<Flair linkFlair={submission} subreddit={submission.subreddit} />
		<Tag postTag={submission} />
	</div>
	<Submitter submitter={submission} type="submission" showSubreddit={showSubreddit2} />

	{#if submission.removed_by_category}
		<div class="my-2 w-fit rounded-3xl border border-red-500 px-4 py-1">
			{#if submission.removed_by_category === 'moderator'}
				<p>Sorry, this post has been removed by the moderators of r/{submission.subreddit}.</p>
			{:else if submission.removed_by_category === 'deleted' || submission.removed_by_category === 'author'}
				<p>Sorry, this post was deleted by the person who originally posted it.</p>
			{:else if submission.removed_by_category === 'reddit'}
				<p>Sorry, this post was removed by Reddit's spam filters.</p>
			{/if}
		</div>
	{/if}

	{#if !submission.is_self}
		<div class="reddit-md">
			<a class="line-clamp-1" href={submission.url} target="_blank" rel="noreferrer"
				>{submission.url}</a
			>
		</div>
	{/if}
	{#if type === 'submission'}
		<div class="">
			<Embed {submission} />
		</div>
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
