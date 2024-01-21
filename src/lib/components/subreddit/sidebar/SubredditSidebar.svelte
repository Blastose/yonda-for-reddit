<script lang="ts">
	import type { Widget, SubredditData } from 'jsrwrap/types';
	import WidgetIdCard from './WidgetIdCard.svelte';
	import WidgetMenu from './WidgetMenu.svelte';
	import WidgetPostFlair from './WidgetPostFlair.svelte';
	import WidgetRules from './WidgetRules.svelte';
	import WidgetTextarea from './WidgetTextarea.svelte';
	import WidgetImage from './WidgetImage.svelte';
	import WidgetModerators from './WidgetModerators.svelte';
	import WidgetCommunityList from './WidgetCommunityList.svelte';
	import WidgetButton from './WidgetButton.svelte';
	import WidgetCalendar from './WidgetCalendar.svelte';
	import WidgetCustom from './WidgetCustom.svelte';
	import Hr from '$lib/components/layout/Hr.svelte';
	import type { MaybePromise } from '@sveltejs/kit';
	import type { Moderators } from '$lib/reddit/reddit';

	export let widgets: Widget[] | null;
	export let about: SubredditData;
	export let moderatorsPromise: MaybePromise<Moderators> | null;
</script>

{#if widgets}
	<aside class="inherit-text-size flex flex-col gap-2 rounded-md bg-[var(--accent-l2)] p-4 text-sm">
		{#each widgets as widget, index}
			{#if widget.kind === 'id-card'}
				<WidgetIdCard {widget} {about} />
			{:else if widget.kind === 'menu'}
				<WidgetMenu {widget} {about} />
			{:else if widget.kind === 'post-flair'}
				<WidgetPostFlair {widget} />
			{:else if widget.kind === 'subreddit-rules'}
				<WidgetRules {widget} />
			{:else if widget.kind === 'textarea'}
				<WidgetTextarea {widget} />
			{:else if widget.kind === 'image'}
				<WidgetImage {widget} />
			{:else if widget.kind === 'community-list'}
				<WidgetCommunityList {widget} />
			{:else if widget.kind === 'button'}
				<WidgetButton {widget} />
			{:else if widget.kind === 'calendar'}
				<WidgetCalendar {widget} />
			{:else if widget.kind === 'custom'}
				<WidgetCustom {widget} />
			{/if}
			{#if index !== widgets.length - 1}
				<Hr />
			{/if}
		{/each}
		{#if moderatorsPromise}
			{#await moderatorsPromise then moderators}
				<Hr />
				<WidgetModerators {moderators} />
			{/await}
		{/if}
	</aside>
{/if}
