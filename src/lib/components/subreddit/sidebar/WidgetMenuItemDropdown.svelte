<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { WidgetMenu } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let menuItem: WidgetMenu['data'][number];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		loop: true,
		preventScroll: false
	});
</script>

<button
	type="button"
	use:melt={$trigger}
	class="flex items-center justify-center rounded-2xl bg-[var(--accent-l1)] px-2 py-1 text-center"
>
	{menuItem.text}
	<Icon name="chevronDown" height="16" width="16" />
</button>

{#if menuItem.children}
	{#if $open}
		<div class="text-sm shadow-lg" use:melt={$menu} transition:fly={{ duration: 150, y: -10 }}>
			{#each menuItem.children as child}
				<a
					target="_blank"
					rel="noreferrer"
					class="block bg-[var(--accent-l1)] px-4 py-2 duration-300 hover:bg-[var(--accent-l1-hover)]"
					use:melt={$item}
					href={child.url}>{child.text}</a
				>
			{/each}
		</div>
	{/if}
{/if}
