<script lang="ts">
	export let rawHTML: string;
	export let fixedSize = true;
	export let centerImage = true;

	const addRevealedClass = (event: Event) => {
		const element = event.currentTarget as HTMLSpanElement;
		element.classList.add('revealed');
	};

	const addEventListeners = (node: HTMLElement) => {
		const spoilerTextElements = node.querySelectorAll('.spoiler');
		spoilerTextElements.forEach((element) => {
			element.addEventListener('click', addRevealedClass);
		});
		return {
			destroy() {
				spoilerTextElements.forEach((element) => {
					element.removeEventListener('click', addRevealedClass);
				});
			}
		};
	};
</script>

{#key rawHTML}
	<div class="grid">
		<div
			class="reddit-md {fixedSize ? 'max-w-4xl' : ''}"
			class:image-left={!centerImage}
			use:addEventListeners
		>
			{@html rawHTML}
		</div>
	</div>
{/key}
