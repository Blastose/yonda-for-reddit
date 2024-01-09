<script lang="ts">
	import type { WidgetSubredditRules } from 'jsrwrap/types';
	import WidgetRule from './WidgetRule.svelte';
	import WidgetContainer from './WidgetContainer.svelte';

	export let widget: WidgetSubredditRules;
</script>

<WidgetContainer sectionHeading={widget.shortName}>
	<div class="flex flex-col">
		{#each widget.data as rule, index}
			<WidgetRule {rule} ruleNumber={index + 1} />
		{/each}
	</div>
</WidgetContainer>
