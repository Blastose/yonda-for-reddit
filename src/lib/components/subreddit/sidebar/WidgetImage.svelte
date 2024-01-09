<script lang="ts">
	import type { WidgetImage } from 'jsrwrap/types';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetImage;

	$: randomIndex = Math.floor(Math.random() * widget.data.length);
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-col gap-2">
		<a href={widget.data[randomIndex].linkUrl}>
			<img src={widget.data[randomIndex].url} alt="" />
		</a>
	</div>
</WidgetContainer>
