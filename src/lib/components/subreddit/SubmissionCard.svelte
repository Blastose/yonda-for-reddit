<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { removeTrailingBackslashFromUrl } from '$lib/url/url';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import Embed from './embed/Embed.svelte';
	import { db } from '$lib/idb/idb';
	import { setSubmissionStore } from '$lib/stores/submissionStore';
	import SubmissionActions from './SubmissionActions.svelte';
	import SubmissionInfo from './SubmissionInfo.svelte';

	export let submission: SubmissionData;
	$: href = removeTrailingBackslashFromUrl(submission.permalink.toLowerCase());

	async function getCommentCount() {
		return (await db.get('submissionCommentCount', submission.id)) ?? submission.num_comments;
	}

	let numNewComments: number = 0;
	$: (async () => {
		numNewComments = submission.num_comments - (await getCommentCount());
	})();
</script>

<ClickableDivWrapper
	{href}
	onClick={() => {
		setSubmissionStore(href, submission);
	}}
>
	<article class="flex flex-col gap-2">
		<SubmissionInfo {submission} type="subreddit" />

		<Embed {submission} />

		<SubmissionActions {submission} {numNewComments} type="subreddit" />
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
