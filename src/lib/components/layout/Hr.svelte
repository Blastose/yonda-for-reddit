<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<hr class={className} />

<style>
	hr {
		border-color: var(--divider-color);
	}
</style>
