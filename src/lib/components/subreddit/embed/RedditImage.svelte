<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getSrcsetAndSizes } from '../images/image';
	import Image from './Image.svelte';
	import ImageViewerDialog from '$lib/components/layout/dialog/ImageViewerDialog.svelte';

	export let submission: SubmissionData;

	$: defaultImage = submission.preview.images.at(0)?.source;
	$: defaultImageUrl = defaultImage?.url ?? '';
	$: srcsetAndSizes = getSrcsetAndSizes(submission.preview.images.at(0)!);
	$: bgImage = submission.preview.images.at(0)?.resolutions.at(0);
	$: bgImageUrl = bgImage?.url ?? '';
	$: aspectRatio = (defaultImage?.width ?? 0) / (defaultImage?.height ?? 1);

	$: spoiler = submission.spoiler;
	$: nsfw = submission.over_18;
</script>

<ImageViewerDialog title={submission.title}>
	<span class="cursor-pointer" slot="trigger">
		<Image
			{aspectRatio}
			{bgImageUrl}
			{defaultImageUrl}
			srcset={srcsetAndSizes?.srcset}
			sizes={srcsetAndSizes?.sizes}
			altText="{submission.subreddit_name_prefixed} - {submission.title}"
		/>
	</span>

	<div class="pointer-events-none select-none" slot="content">
		<img
			class="max-h-[calc(100vh-120px)]"
			src={defaultImageUrl}
			srcset={srcsetAndSizes?.srcset}
			sizes={srcsetAndSizes?.sizes}
			alt=""
		/>
	</div>
</ImageViewerDialog>
