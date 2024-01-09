<script lang="ts">
	import type { WidgetIdCard, SubredditData } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	function formatNumber(n: number) {
		return formatter.format(n);
	}

	export let widget: WidgetIdCard;
	export let about: SubredditData;
</script>

<WidgetContainer sectionHeading={about.display_name}>
	<p class="text-neutral-400">{widget.description}</p>

	<div>
		<p>
			<span>{formatNumber(widget.subscribersCount)}</span>
			<span class="text-neutral-400">{widget.subscribersText || 'members'}</span>
		</p>
		<p>
			<span>{formatNumber(widget.currentlyViewingCount)}</span>
			<span class="text-neutral-400">{widget.currentlyViewingText || 'online'}</span>
		</p>
	</div>
</WidgetContainer>
