<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';

	export let heading: string;
	let open = true;
</script>

<div>
	<button
		class="flex w-full justify-between rounded-lg px-2 py-2 hover:bg-[var(--bg-hover)]"
		on:click={() => {
			open = !open;
		}}
	>
		<span>{heading}</span>
		<span class={open ? 'rotate-180' : ''}><Icon name="chevronDown" /></span>
	</button>
	{#if open}
		<div><slot /></div>
	{/if}
</div>
