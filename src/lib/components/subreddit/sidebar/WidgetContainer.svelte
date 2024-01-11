<script lang="ts">
	export let sectionHeading: string;
</script>

<section class="flex flex-col gap-2">
	<h2 class="font-semibold">{sectionHeading}</h2>

	<slot />
</section>
