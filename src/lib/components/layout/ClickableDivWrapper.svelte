<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;
	export let fit: boolean = false;
	export let onClick: () => void = () => {};

	let validPointerDownTarget = false;

	function isValidTarget(target: HTMLElement | null) {
		if (target?.closest('a, button, .stop-click-func')) return false;
		const isTextSelected = window?.getSelection()?.toString();
		if (isTextSelected) return false;
		return true;
	}

	function handlePointerDown(e: Event) {
		const target = e.target as HTMLElement | null;
		if (!isValidTarget(target)) return;
		validPointerDownTarget = true;
	}

	function handlePointerUp(e: PointerEvent) {
		if (e.button !== 0) return;
		if (!validPointerDownTarget) return;
		validPointerDownTarget = false;
		const target = e.target as HTMLElement | null;
		if (e.ctrlKey) return;
		if (!isValidTarget(target)) return;
		onClick();
		goto(href);
	}
</script>

<div
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:keydown={(e) => {
		if (e.key !== 'Enter' || e.currentTarget !== e.target) return;

		e.preventDefault();
		goto(href);
	}}
	role="link"
	tabindex="0"
	class="cursor-pointer {fit ? 'h-fit w-fit' : ''}"
>
	<slot />
</div>
