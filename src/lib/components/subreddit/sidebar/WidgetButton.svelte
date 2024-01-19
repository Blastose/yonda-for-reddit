<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { WidgetButton } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetButton;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<RedditHtml rawHTML={markdownToHtml(widget.description)} />
	<div class="flex flex-col gap-2">
		{#each widget.buttons as button}
			{#if button.kind === 'text'}
				<a
					target="_blank"
					rel="noreferrer"
					class="w-full rounded-2xl bg-[var(--accent-l1)] px-2 py-1 text-center"
					href={button.url}>{button.text}</a
				>
			{:else if button.kind === 'image'}
				<a
					target="_blank"
					rel="noreferrer"
					class="w-full rounded-2xl text-center"
					href={button.linkUrl}
				>
					<img src={button.url} alt={button.text} height={button.height} width={button.width} />
				</a>
			{/if}
		{/each}
	</div>
</WidgetContainer>
