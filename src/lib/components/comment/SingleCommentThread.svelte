<script lang="ts">
	import { page } from '$app/stores';
	import type { SubmissionFull } from '$lib/reddit/reddit';
	import { buildShowParentCommentsLink, removeTrailingBackslashFromUrl } from '$lib/url/url';
	import Hr from '../layout/Hr.svelte';

	export let submission: SubmissionFull;
</script>

<div class="flex items-center justify-between gap-2 whitespace-nowrap text-sm">
	{#if submission.comments.length > 0 && submission.comments[0].parent_id.slice(0, 3) !== 't3_'}
		<a
			class="text-[var(--link-color)]"
			href={buildShowParentCommentsLink(submission.comments[0].id, $page.url.pathname)}
			>Show parent comments</a
		>
	{:else}
		<p class="cursor-not-allowed text-[var(--visited-link-color)]">Show parent comments</p>
	{/if}
	<Hr class="w-full" />
	<a
		class="text-[var(--link-color)]"
		href={removeTrailingBackslashFromUrl(submission.permalink.toLowerCase())}>View all comments</a
	>
</div>
