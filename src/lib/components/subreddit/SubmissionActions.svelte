<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '../icon/Icon.svelte';
	import { submissionStoreClick } from '$lib/stores/submissionStore';
	import { formatSubmissionPermalink, transformUrlForIDBKey } from '$lib/url/url';
	import { formatter } from '$lib/reddit/number';
	import SubmissionMoreOptions from './SubmissionMoreOptions.svelte';
	import VoteActions from '../actions/VoteActions.svelte';
	import { historyStore } from '$lib/stores/historyStore';
	import { db } from '$lib/idb/idb';
	import { page } from '$app/stores';
	import type { MaybePromise } from '@sveltejs/kit';

	export let submission: SubmissionData;
	export let numNewComments: number;
	export let type: 'subreddit' | 'submission';

	$: href = formatSubmissionPermalink(submission.permalink);

	function persistVote(votable?: { score: number; likes: boolean | null }) {
		const index = $historyStore.index;
		const backUrl = $historyStore.urls.at(index - 1);
		const forwardUrls = $historyStore.urls.at(index + 1);

		if (votable) {
		}
		// Check if back/forward url type for subreddit or comments
		// Get submissionsStore for back and forward?
		// Find if array index the submission / the comment
		// vote it
		// Set submissionStores
		// the end

		// db.put('submissions', s, transformUrlForIDBKey($page.url));
	}
</script>

<div class="mt-4 flex items-center gap-2 font-semibold">
	<VoteActions votable={submission} type="submission" {persistVote} />

	{#if type === 'subreddit'}
		<a
			use:submissionStoreClick={{ url: href, submission }}
			{href}
			class="flex h-full w-fit items-center gap-1 rounded-2xl bg-[var(--accent-l1)] px-3 py-1 text-sm hover:bg-[var(--accent-l1-hover)]"
		>
			<div class="flex h-[24px] items-center">
				<Icon name="comment" height="20" width="20" />
			</div>
			<span class="flex gap-2">
				{formatter.format(submission.num_comments)}
				{#if numNewComments > 0}
					<span class="text-red-400"> ({numNewComments} new)</span>
				{/if}
			</span>
		</a>
	{:else}
		<div
			title={submission.num_comments.toString()}
			class="flex w-fit items-center gap-1 rounded-2xl bg-[var(--accent-l1)] px-3 py-1 text-sm"
		>
			<div class="flex h-[24px] items-center">
				<Icon name="comment" height="20" width="20" />
			</div>
			{formatter.format(submission.num_comments)}
		</div>
	{/if}

	<SubmissionMoreOptions {submission} />
</div>
