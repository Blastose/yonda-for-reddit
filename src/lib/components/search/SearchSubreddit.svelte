<script lang="ts">
	import type { SubredditData } from 'jsrwrap/types';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';
	import { formatDate } from '$lib/reddit/number';

	export let subreddit: SubredditData;
	$: icon = subreddit.community_icon || subreddit.icon_img;
</script>

<ClickableDivWrapper href={subreddit.display_name_prefixed.toLowerCase()}>
	<article class="grid grid-cols-[48px_1fr] gap-4">
		{#if icon}
			<img class="h-[48px] w-[48px] rounded-full" height="48" width="48" src={icon} alt="" />
		{:else}
			<div
				class="flex h-[48px] w-[48px] items-center justify-center rounded-full border-4 border-[#292b2f] bg-[#292b2f] text-xl"
			>
				r/
			</div>
		{/if}
		<div>
			<a href={subreddit.display_name_prefixed.toLowerCase()} class="text-lg font-bold"
				>{subreddit.display_name_prefixed}</a
			>
			<p class="text-sm text-[var(--visited-link-color)]">
				{subreddit.subscribers?.toLocaleString() ?? 'unknown'} members • created {formatDate(
					new Date(subreddit.created_utc * 1000)
				)}
			</p>
			{#if subreddit.public_description_html}
				<p class="text-sm text-[#b5b5b9]">
					{@html subreddit.public_description_html}
				</p>
			{/if}
		</div>
	</article>
</ClickableDivWrapper>

<style>
	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: var(--bg-hover);
	}
</style>
