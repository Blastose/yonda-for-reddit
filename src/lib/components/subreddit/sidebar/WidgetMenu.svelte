<script lang="ts">
	import type { SubredditData, WidgetMenu } from 'jsrwrap/types';
	import WidgetMenuItemDropdown from './WidgetMenuItemDropdown.svelte';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetMenu;
	export let about: SubredditData;
</script>

<WidgetContainer sectionHeading={'Menu'}>
	<div class="flex flex-col gap-2">
		{#if widget.showWiki}
			<a
				class="w-full rounded-2xl bg-[var(--accent-l1)] px-2 py-1 text-center"
				target="_blank"
				rel="noreferrer"
				href="/{about.display_name_prefixed}/wiki/index">Wiki</a
			>
		{:else}
			{#each widget.data as menuItem}
				{#if menuItem.url}
					<a
						class="w-full rounded-2xl bg-[var(--accent-l1)] px-2 py-1 text-center"
						target="_blank"
						rel="noreferrer"
						href={menuItem.url}>{menuItem.text}</a
					>
				{:else if menuItem.children}
					<WidgetMenuItemDropdown {menuItem} />
				{/if}
			{/each}
		{/if}
	</div>
</WidgetContainer>
