<script lang="ts">
	import { page } from '$app/stores';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { db } from '$lib/idb/idb.js';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';
	import { setSubmissionStore, submissionStore } from '$lib/stores/submissionStore.js';

	export let data;

	$: {
		$page;
		(async () => {
			const submission = await data.submission;
			setSubmissionStore(transformUrlForIDBKey($page.url), submission);
			db.put('subredditv2', submission, transformUrlForIDBKey($page.url));
			db.put('submissionCommentCount', submission.num_comments, submission.id);
		})();
	}
</script>

{#if $submissionStore && $submissionStore.url === transformUrlForIDBKey($page.url)}
	{@const a = $submissionStore.submission}
	<div class="flex flex-col gap-2 pt-2">
		<h1 class="text-2xl font-bold">{a.title}</h1>
		<p class="text-sm">{a.author}</p>
		<div class="">
			<RedditHtml rawHTML={markdownToHtml(a.selftext)} />
			{a.num_comments}
		</div>
	</div>
{:else}
	{#await data.submission}
		<p>Loading....</p>
	{:then submission}
		<div class="flex flex-col gap-2 pt-2">
			<h1 class="text-2xl font-bold">{submission.title}</h1>
			<p class="text-sm">{submission.author}</p>
			<div class="">
				<RedditHtml rawHTML={markdownToHtml(submission.selftext)} />
				{submission.num_comments}
			</div>
		</div>
	{/await}
{/if}

<slot />
