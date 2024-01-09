<script lang="ts">
	import type { WidgetCalendar } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetCalendar;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-wrap gap-2">
		{#each widget.data as cal}
			<div>
				<p>{cal.title}</p>
				<p class="opacity-60">{new Date(cal.startTime * 1000)}</p>
			</div>
		{/each}
	</div>
</WidgetContainer>
