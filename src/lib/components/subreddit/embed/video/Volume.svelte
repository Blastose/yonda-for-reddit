<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import VolumeSlider from './VolumeSlider.svelte';

	export let volume: number;
	let muted = false;
	let lastVolumeValue = volume;

	let hovering = false;

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
</script>

<div class="flex items-center gap-2">
	<button on:click={toggleMute} class="control-button">
		{#if muted || volume === 0}
			<Icon name="volumeMute" />
		{:else if volume > 0.5}
			<Icon name="volumeHigh" />
		{:else}
			<Icon name="volumeMedium" />
		{/if}
	</button>
	<VolumeSlider bind:volume />
	{volume}
</div>
