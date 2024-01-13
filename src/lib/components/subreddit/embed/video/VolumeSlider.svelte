<script lang="ts">
	import { lsdb } from '$lib/idb/ls';

	export let volume: number;
	export let lastVolumeValue: number;
	export let muted: boolean;
	export const muteInput = () => {
		volumeNode.value = '0';
	};
	export const setInputValue = (v: number) => {
		volumeNode.value = (v * 100).toString();
	};

	let volumeNode: HTMLInputElement;

	function parseNewInputValue(value: string) {
		return Number(value) / 100;
	}

	function setInitialValue(node: HTMLInputElement) {
		node.value = String(volume * 100);
	}

	function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		volume = parseNewInputValue(e.currentTarget.value);
		lsdb.set('videoVolume', volume.toString());
		if (volume === 0) {
			muted = true;
		} else {
			muted = false;
		}
	}

	function handleOnChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const newValue = parseNewInputValue(e.currentTarget.value);
		if (newValue !== 0) {
			lastVolumeValue = newValue;
		}
	}
</script>

<div class="relative h-1 bg-gray-800">
	<div style:width="{volume * 100 ?? 0}%" class="absolute h-1 bg-white"></div>
	<input
		on:input={handleInput}
		on:change={handleOnChange}
		use:setInitialValue
		bind:this={volumeNode}
		type="range"
		min="0"
		max="100"
		name=""
		id=""
	/>
</div>

<style>
	input[type='range'] {
		position: relative;
		top: -14px;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 6rem;
	}

	@supports (-moz-appearance: none) {
		input[type='range'] {
			top: -8px;
		}
	}

	input[type='range']::-webkit-slider-runnable-track {
		padding: 1rem 0rem;
		background-color: transparent;
		height: 4px;
	}

	input[type='range']::-moz-range-track {
		padding: 1rem 0rem;
		background-color: transparent;
		height: 4px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: -8px;
		background-color: #ffffff;
		height: 1rem;
		width: 1rem;
		border-radius: 9999px;
	}

	input[type='range']::-moz-range-thumb {
		border: none;
		border-radius: 0;
		margin-top: 0px;
		background-color: #ffffff;
		height: 1rem;
		width: 1rem;
		border-radius: 9999px;
	}
</style>
