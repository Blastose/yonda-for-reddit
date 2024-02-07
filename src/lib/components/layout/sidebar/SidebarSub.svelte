<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';

	export let url: string;
	export let display: string;
	export let icon: string | undefined = undefined;
	export let useSlot: boolean = false;
	export let reorder:
		| {
				moveUp: () => void;
				moveDown: () => void;
				reordering: boolean;
		  }
		| undefined;

	$: href = url === '/' ? '/' : url;
</script>

{#if reorder?.reordering}
	<div class="sub-item grid grid-cols-[32px_1fr] items-center gap-2">
		<span class="flex h-[32px] w-[32px] items-center justify-center">
			{#if icon}
				<img height="32" width="32" class="rounded-full" src={icon} alt="" />
			{:else if useSlot}
				<slot />
			{:else}
				<span
					class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[var(--accent-l1)]"
					>r/</span
				>
			{/if}
		</span>

		<div class="grid grid-cols-[1fr_min-content]">
			<span class="overflow-hidden text-ellipsis whitespace-nowrap">{display}</span>

			<div class="flex items-center whitespace-nowrap">
				<button on:click={reorder.moveUp}><Icon name="chevronDown" class="rotate-180" /></button>
				<button on:click={reorder.moveDown}><Icon name="chevronDown" /></button>
			</div>
		</div>
	</div>
{:else}
	<a class="sub-item grid grid-cols-[32px_1fr] items-center gap-2" {href}>
		<span class="flex h-[32px] w-[32px] items-center justify-center">
			{#if icon}
				<img height="32" width="32" class="rounded-full" src={icon} alt="" />
			{:else if useSlot}
				<slot />
			{:else}
				<span
					class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[var(--accent-l1)]"
					>r/</span
				>
			{/if}
		</span>

		<span class="overflow-hidden text-ellipsis whitespace-nowrap">{display}</span>
	</a>
{/if}

<style>
	.sub-item {
		padding: 0.25rem 1rem;
		border-radius: 1rem;
	}

	.sub-item:hover {
		background-color: var(--bg-hover);
	}
</style>
