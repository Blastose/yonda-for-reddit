<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { fade } from 'svelte/transition';
	import VolumeSlider from './VolumeSlider.svelte';
	import { writable } from 'svelte/store';

	export let volume: number;
	let muted = false;
	let lastVolumeValue = volume;

	let hovering = false;

	let volumeStore = writable([volume]);

	$: console.log(volume);

	function toggleMute() {
		if (muted) {
			volume = lastVolumeValue;
		} else {
			lastVolumeValue = volume;
			volume = 0;
		}
		muted = !muted;
	}

	function volumeControl(node: HTMLElement) {
		function a() {
			hovering = true;
		}
		function b() {
			hovering = false;
		}
		node.addEventListener('pointerover', a);
		node.addEventListener('pointerout', b);
		return {
			destroy() {
				node.removeEventListener('pointerover', a);
				node.removeEventListener('pointerout', b);
			}
		};
	}
</script>

<div class="flex flex-col items-center gap-2" use:volumeControl>
	<div class="pt-8 duration-300 {hovering ? 'opacity-100' : 'opacity-100'}">
		<VolumeSlider bind:volume {volumeStore} />
	</div>

	<button
		on:click={toggleMute}
		class="control-button bg-gradient-to-b from-transparent from-10% via-[#000000ff] to-black p-4"
	>
		{#if muted || volume === 0}
			<Icon name="volumeMute" />
		{:else if volume > 0.5}
			<Icon name="volumeHigh" />
		{:else}
			<Icon name="volumeMedium" />
		{/if}
	</button>
</div>
