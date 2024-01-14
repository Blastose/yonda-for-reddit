<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getSrcsetAndSizes } from '../images/image';
	import Image from './Image.svelte';

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

<Image
	{aspectRatio}
	{bgImageUrl}
	{defaultImageUrl}
	srcset={srcsetAndSizes?.srcset}
	sizes={srcsetAndSizes?.sizes}
	altText="{submission.subreddit_name_prefixed} - {submission.title}"
/>
