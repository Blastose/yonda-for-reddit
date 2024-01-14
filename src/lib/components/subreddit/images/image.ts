import type { SubmissionData } from 'jsrwrap/types';

export type RedditImageData = Omit<SubmissionData['preview']['images'][0], 'variants'>;

export function getSrcsetAndSizes(redditImageData: RedditImageData) {
	const image = redditImageData;
	if (!image) return null;
	const resolutions = image.resolutions;
	const srcsetWidths = [320, 640, 1080];
	if (!srcsetWidths.includes(image.source.width)) {
		resolutions.push(image.source);
		srcsetWidths.push(image.source.width);
		srcsetWidths.sort((a, b) => a - b);
	}

	let srcset = '';
	resolutions.forEach((r, index) => {
		const indexOfWidth = srcsetWidths.findIndex((s) => s === r.width);
		if (indexOfWidth !== -1) {
			srcset += r.url;
			srcset += ' ';
			srcset += `${r.width}w`;

			// Remove the used width since sometimes the width is repeated in the resolutions array
			srcsetWidths.splice(indexOfWidth, 1);

			// Add a comma if we're not at the end of the array
			if (index !== resolutions.length - 1) {
				srcset += ', ';
			}
		}
	});

	const sizes = '(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw';
	return { srcset, sizes };
}

export function getGalleryData(submission: SubmissionData) {
	if (!submission.is_gallery || !submission.gallery_data || !submission.media_metadata) {
		return [];
	}
	if (!submission.media_metadata) return [];

	const res: (RedditImageData & { outboundUrl?: string; caption?: string })[] = [];

	for (const item of submission.gallery_data.items) {
		const galleryItem = submission.media_metadata[item.media_id];
		if (galleryItem.status === 'unprocessed') {
			break;
		}
		if (galleryItem.e === 'Image') {
			const resolutions =
				galleryItem.p?.map((p) => {
					return {
						height: p.y,
						width: p.x,
						url: p.u
					};
				}) ?? [];
			const source = {
				height: galleryItem.s.x,
				width: galleryItem.s.y,
				url: galleryItem.s.u
			};
			res.push({
				source,
				resolutions,
				id: galleryItem.id,
				caption: item.caption,
				outboundUrl: item.outbound_url
			});
		} else if (galleryItem.e === 'AnimatedImage') {
			const resolutions =
				galleryItem.p?.map((p) => {
					return {
						height: p.y,
						width: p.x,
						url: p.u
					};
				}) ?? [];
			const source = {
				height: galleryItem.s.x,
				width: galleryItem.s.y,
				url: galleryItem.s.gif
			};
			res.push({
				source,
				resolutions,
				id: galleryItem.id,
				caption: item.caption,
				outboundUrl: item.outbound_url
			});
		}
	}

	return res;
}
