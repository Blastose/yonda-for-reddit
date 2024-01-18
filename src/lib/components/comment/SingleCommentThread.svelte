<script lang="ts">
	import { page } from '$app/stores';
	import type { SubmissionFull } from '$lib/reddit/reddit';
	import { buildShowParentCommentsLink, removeTrailingBackslashFromUrl } from '$lib/url/url';

	export let submission: SubmissionFull;
</script>

<div class="reddit-md flex items-center justify-between gap-2 whitespace-nowrap text-sm">
	{#if submission.comments.length > 0 && submission.comments[0].parent_id.slice(0, 3) !== 't3_'}
		<a href={buildShowParentCommentsLink(submission.comments[0].id, $page.url.pathname)}
			>Show parent comments</a
		>
	{:else}
		<p class="cursor-not-allowed text-neutral-600">Show parent comments</p>
	{/if}
	<hr class="w-full border-[#58585a]" />
	<a href={removeTrailingBackslashFromUrl(submission.permalink.toLowerCase())}>View all comments</a>
</div>
