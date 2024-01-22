<script lang="ts">
	import type { WidgetCommunityList } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetCommunityList;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="reddit-md flex flex-col gap-2">
		{#each widget.data as sub}
			<div class="reddit-md flex flex-col">
				<a href="/{sub.prefixedName.toLowerCase()}">{sub.prefixedName}</a>
				<span>{sub.subscribers.toLocaleString()} members</span>
			</div>
		{/each}
	</div>
</WidgetContainer>
