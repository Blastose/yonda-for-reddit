<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { WidgetSubredditRules } from 'jsrwrap/types';

	export let rule: WidgetSubredditRules['data'][number];
	export let ruleNumber: number;

	let open = false;
</script>

<div class="text-[var(--text-color-sub)]">
	<button
		on:click={() => {
			if (!rule.descriptionHtml) return;
			open = !open;
		}}
		class="{rule.descriptionHtml ? 'summary' : 'cursor-default'} 
      grid w-full grid-cols-[20px_1fr_min-content] items-center gap-4 text-left"
	>
		<div class="text-center">{ruleNumber}</div>
		<div>
			<p>{rule.shortName}</p>
		</div>
		{#if rule.descriptionHtml}
			<div class={open ? 'rotate-180' : ''}><Icon name="chevronDown" /></div>
		{/if}
	</button>
	{#if open}
		<div class="ml-[36px]">
			<RedditHtml rawHTML={markdownToHtml(rule.description)} />
		</div>
	{/if}
</div>

<style>
	.summary {
		padding: 0.25rem 0.125rem;
		border-radius: 0.375rem;
		transition: background-color 300ms;
	}

	.summary:hover {
		background-color: var(--accent-l1);
	}
</style>
