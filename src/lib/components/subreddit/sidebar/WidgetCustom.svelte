<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/reddit/markdownToHtml';
	import type { WidgetCustom } from 'jsrwrap/types';

	export let widget: WidgetCustom;

	function useWidgetCss(_: HTMLElement) {
		const imageMap = new Map<string, string>();
		for (const image of widget.imageData) {
			imageMap.set(image.name, image.url);
		}

		let newCss = `.widget-custom-${widget.id} {${widget.css}}`;
		newCss = newCss.replaceAll(/url\(%%(.*)%%\)/g, (_match, p1) => {
			const newUrl = imageMap.get(p1) ?? p1;
			return `url("${newUrl}")`;
		});

		const styleNode = document.createElement('style');
		styleNode.id = widget.id;
		styleNode.classList.add('subreddit-custom-widget-css');
		styleNode.appendChild(document.createTextNode(newCss));
		document.head.appendChild(styleNode);

		return {
			destroy() {
				const styleNodes = document.querySelectorAll('style.subreddit-custom-widget-css') ?? [];
				for (const node of styleNodes) {
					node.remove();
				}
			}
		};
	}
</script>

<section use:useWidgetCss class="widget-custom-{widget.id} flex flex-col gap-2">
	<RedditHtml rawHTML={markdownToHtml(widget.text)} />
</section>
