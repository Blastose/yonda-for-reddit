<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RelativeTime from './RelativeTime.svelte';
	import { removeTrailingBackslashFromUrl } from '$lib/url/url';
	import Flair from './Flair.svelte';
	import Icon from '../icon/Icon.svelte';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import UserFlair from './UserFlair.svelte';
	import Embed from './embed/Embed.svelte';
	import { db } from '$lib/idb/idb';
	import { submissionStoreClick, setSubmissionStore } from '$lib/stores/submissionStore';

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
		<div class="flex flex-col gap-1">
			{#if submission.link_flair_text}
				<div class="w-fit">
					<Flair linkFlair={submission} />
				</div>
			{/if}

			<h2 class="text-xl font-bold">
				<a use:submissionStoreClick={{ url: href, submission }} class="submission-title" {href}
					>{submission.title}</a
				>
			</h2>

			<div class="flex items-center gap-1">
				<div class="flex flex-wrap gap-2 text-sm">
					<a class="font-semibold text-[#a1a5d8]" href="/user/{submission.author}"
						>u/{submission.author}</a
					>
					<UserFlair author={submission} />
				</div>

				<div class="text-xs text-[var(--visited-link-color)]">
					•
					<RelativeTime
						postedTimeSeconds={submission.created_utc}
						editedTimeSeconds={submission.edited}
					/>
				</div>
			</div>
		</div>

		<Embed {submission} />

		<div class="mt-4 flex items-center gap-2">
			<div class="flex w-fit items-center gap-1 rounded-2xl bg-[#2c2c2c] px-2 py-1 text-sm">
				<button><Icon name="arrowUpOutline" /></button>
				<span class="">{submission.num_comments}</span>
				<button><Icon name="arrowDownOutline" /></button>
			</div>

			<a
				use:submissionStoreClick={{ url: href, submission }}
				{href}
				class="flex h-full w-fit items-center gap-1 rounded-2xl bg-[#2c2c2c] px-3 py-1 text-sm"
			>
				<div class="flex h-[24px] items-center">
					<Icon name="comment" height="20" width="20" />
				</div>
				<span class="flex gap-2">
					{submission.num_comments}
					{#if numNewComments > 0}
						<span class="text-red-400"> ({numNewComments} new)</span>
					{/if}
				</span>
			</a>
		</div>
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

	a.submission-title:visited {
		color: var(--visited-link-color);
	}
</style>
