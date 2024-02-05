<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';

	export let heading: string;
	export let open: boolean;
	export let toggleOpen: () => void;
</script>

<div>
	<button
		class="flex w-full justify-between rounded-lg px-2 py-2 hover:bg-[var(--bg-hover)]"
		on:click={toggleOpen}
	>
		<span>{heading}</span>
		<span class={open ? 'rotate-180' : ''}><Icon name="chevronDown" /></span>
	</button>
	{#if open}
		<div><slot /></div>
	{/if}
</div>
