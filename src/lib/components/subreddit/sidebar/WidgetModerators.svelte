<script lang="ts">
	import WidgetContainer from './WidgetContainer.svelte';
	import type { Moderators } from '$lib/reddit/reddit';

	export let moderators: Moderators;
</script>

<WidgetContainer sectionHeading="Moderators">
	<div class="reddit-md flex flex-col gap-2">
		{#each moderators as mod}
			<a href="/u/{mod.name}">u/{mod.name}</a>
		{/each}
	</div>
</WidgetContainer>
