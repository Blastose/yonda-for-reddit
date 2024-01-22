<script lang="ts">
	export let url: string;
	export let display: string;
	export let icon: string | undefined = undefined;
	export let useSlot: boolean = false;

	$: href = url === '/' ? '/' : url;
</script>

<a class="grid grid-cols-[32px_1fr] items-center gap-2" {href}>
	<span class="flex h-[32px] w-[32px] items-center justify-center">
		{#if icon}
			<img class="rounded-full" src={icon} alt="" />
		{:else if useSlot}
			<slot />
		{:else}
			<span
				class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[var(--accent-l1)]"
				>r/</span
			>
		{/if}
	</span>

	<span class="line-clamp-1">{display}</span>
</a>

<style>
	a {
		padding: 0.25rem 1rem;
		border-radius: 1rem;
	}

	a:hover {
		background-color: var(--bg-hover);
	}
</style>
