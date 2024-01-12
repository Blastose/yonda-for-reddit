<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';
	import type { Writable } from 'svelte/store';

	export let volume: number;
	export let volumeStore: Writable<number[]>;

	const {
		elements: { root, range, thumb }
	} = createSlider({
		defaultValue: [50],
		max: 100,
		orientation: 'vertical',
		value: volumeStore
	});

	$: volume = ($volumeStore[0] ?? 50) / 100;
</script>

<button
	on:click={() => {
		volumeStore.set([100]);
	}}>asdf</button
>
<span use:melt={$root} class="relative flex h-[100px] w-[4px] flex-col items-center">
	<span class="h-[200px] w-full bg-gray-700">
		<span use:melt={$range} class="w-full bg-white" />
	</span>
	<span
		use:melt={$thumb()}
		class="h-5 w-5 rounded-full bg-white focus:ring-4 focus:!ring-black/40"
	/>
</span>
