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
	<p class="text-[var(--text-color-sub)]">{widget.description}</p>

	<div>
		<p>
			<span>{formatNumber(widget.subscribersCount)}</span>
			<span class="text-[var(--text-color-sub)]">{widget.subscribersText || 'members'}</span>
		</p>
		<p>
			<span>{formatNumber(widget.currentlyViewingCount)}</span>
			<span class="text-[var(--text-color-sub)]">{widget.currentlyViewingText || 'online'}</span>
		</p>
	</div>
</WidgetContainer>
