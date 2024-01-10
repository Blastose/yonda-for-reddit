<script lang="ts">
	import { page } from '$app/stores';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { db } from '$lib/idb/idb.js';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';
	import { setSubmissionStore, submissionStore } from '$lib/stores/submissionStore.js';
	import UserFlair from '$lib/components/subreddit/UserFlair.svelte';
	import RelativeTime from '$lib/components/subreddit/RelativeTime.svelte';
	import Hint from '$lib/components/comment/Hint.svelte';
	import Flair from '$lib/components/subreddit/Flair.svelte';

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
	{@const submission = $submissionStore.submission}
	<div class="flex flex-col gap-2 pt-2">
		<div class="w-fit">
			<Flair linkFlair={submission} />
		</div>
		<h1 class="text-2xl font-bold">{submission.title}</h1>
		<div class="flex flex-wrap items-center gap-1">
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
			<Hint hint={submission} type="submission" />
		</div>
		<div>
			<RedditHtml
				rawHTML={markdownToHtml(submission.selftext, { media_metadata: submission.media_metadata })}
			/>
			{submission.num_comments}
		</div>
	</div>
{:else}
	{#await data.submission}
		<p>Loading....</p>
	{:then submission}
		<div class="flex flex-col gap-2 pt-2">
			<div class="w-fit">
				<Flair linkFlair={submission} />
			</div>
			<h1 class="text-2xl font-bold">{submission.title}</h1>
			<!-- TODO refactor this above and from SubmissionCard.svelte -->
			<div class="flex flex-wrap items-center gap-1">
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
				<Hint hint={submission} type="submission" />
			</div>
			<div>
				<RedditHtml
					rawHTML={markdownToHtml(submission.selftext, {
						media_metadata: submission.media_metadata
					})}
				/>
			</div>
		</div>
	{/await}
{/if}

<slot />
