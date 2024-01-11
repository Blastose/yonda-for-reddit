<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;
	export let fit: boolean = false;
	export let onClick: () => void = () => {};

	function handleOnClick(e: MouseEvent) {
		if (e.ctrlKey) return;
		const target = e.target as HTMLElement | null;
		if (target?.closest('a')) return;
		if (target?.closest('button')) return;
		if (target?.closest('video')) return;
		onClick();
		goto(href);
	}
</script>

<div
	on:click={handleOnClick}
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
