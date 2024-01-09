<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { WidgetTextarea } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetTextarea;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-col gap-2">
		<RedditHtml rawHTML={markdownToHtml(widget.text)} />
	</div>
</WidgetContainer>
