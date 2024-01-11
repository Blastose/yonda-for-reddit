<script lang="ts">
	import type { WidgetModerators } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetModerators;
	// TODO need mod data from elsewhere, as it is not in the widget data
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-col gap-2">
		{#each widget.mods as mod}
			<p>{mod}</p>
		{/each}
	</div>
</WidgetContainer>
