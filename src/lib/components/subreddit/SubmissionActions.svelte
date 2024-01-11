<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '../icon/Icon.svelte';
	import { submissionStoreClick } from '$lib/stores/submissionStore';
	import { removeTrailingBackslashFromUrl } from '$lib/url/url';
	import { formatter } from '$lib/reddit/number';

	export let submission: SubmissionData;
	export let numNewComments: number;
	export let type: 'subreddit' | 'submission';

	$: href = removeTrailingBackslashFromUrl(submission.permalink.toLowerCase());
</script>

<div class="mt-4 flex items-center gap-2">
	<div class="flex w-fit items-center gap-1 rounded-2xl bg-[#2c2c2c] px-2 py-1 text-sm">
		<button><Icon name="arrowUpOutline" /></button>
		<span title={submission.score.toString()}>{formatter.format(submission.score)}</span>
		<button><Icon name="arrowDownOutline" /></button>
	</div>

	{#if type === 'subreddit'}
		<a
			use:submissionStoreClick={{ url: href, submission }}
			{href}
			class="flex h-full w-fit items-center gap-1 rounded-2xl bg-[#2c2c2c] px-3 py-1 text-sm"
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
		<div class="flex w-fit items-center gap-1 rounded-2xl bg-[#2c2c2c] px-2 py-1 text-sm">
			<div class="flex h-[24px] items-center">
				<Icon name="comment" height="20" width="20" />
			</div>
			{formatter.format(submission.num_comments)}
		</div>
	{/if}
</div>
