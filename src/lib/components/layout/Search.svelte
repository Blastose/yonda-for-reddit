<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '../icon/Icon.svelte';

	let searchTerm: string;
	let inputNode: HTMLInputElement;

	function useSlashJumpToSearchBar(_node: HTMLFormElement) {
		function jumpTosearch(e: KeyboardEvent) {
			if (e.key === '/') {
				if (document.activeElement !== inputNode) {
					e.preventDefault();
					inputNode.focus();
				}
			}
		}

		addEventListener('keydown', jumpTosearch);

		return {
			destroy() {
				removeEventListener('keydown', jumpTosearch);
			}
		};
	}
</script>

<form
	use:useSlashJumpToSearchBar
	class="flex w-full max-w-[586px] items-center"
	on:submit={async (e) => {
		e.preventDefault();
		if (!searchTerm) {
			return;
		}
		await goto(`/r/${searchTerm}`);
	}}
>
	<button class="relative left-8">
		<Icon name="search"></Icon>
	</button>
	<input
		bind:this={inputNode}
		bind:value={searchTerm}
		class="w-full rounded-3xl bg-[var(--search-input-bg)] px-4 py-2 pl-10"
		type="text"
		placeholder="Search"
	/>
</form>
