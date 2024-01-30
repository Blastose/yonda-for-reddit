<script lang="ts">
	import type { WidgetPostFlair } from 'jsrwrap/types';
	import Flair from '$lib/components/subreddit/Flair.svelte';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetPostFlair;
	export let subreddit: string;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-wrap gap-2">
		{#each Object.entries(widget.templates) as [_, flair]}
			{@const linkFlair = {
				link_flair_richtext: flair.richtext,
				link_flair_background_color: flair.backgroundColor,
				link_flair_text_color: flair.textColor,
				link_flair_type: flair.type,
				link_flair_text: flair.text
			}}
			<Flair {linkFlair} {subreddit} />
		{/each}
	</div>
</WidgetContainer>
