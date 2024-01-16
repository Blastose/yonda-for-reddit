<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/idb/idb.js';
	import { stripSearchParams, transformUrlForIDBKey } from '$lib/url/url.js';
	import { setSubmissionStore, submissionStore } from '$lib/stores/submissionStore.js';
	import SubmissionInfo from '$lib/components/subreddit/SubmissionInfo.svelte';

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

<div class="flex flex-col gap-8">
	{#if $submissionStore && stripSearchParams($submissionStore?.url) === stripSearchParams(transformUrlForIDBKey($page.url))}
		{@const submission = $submissionStore.submission}
		<SubmissionInfo {submission} type="submission" numNewComments={0} />
	{:else}
		{#await data.submission}
			<p>Loading....</p>
		{:then submission}
			<SubmissionInfo {submission} type="submission" numNewComments={0} />
		{/await}
	{/if}

	<!-- TODO remove -->
	<!-- <hr class="border-[#313131]" /> -->

	<slot />
</div>
