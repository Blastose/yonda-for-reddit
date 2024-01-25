import type { SubmissionData } from 'jsrwrap/types';

export type RedditImageData = SubmissionData['preview']['images'][0];

export function getSrcsetAndSizes(redditImageData: RedditImageData) {
	const image = redditImageData;
	if (!image) return null;

	let source;
	let resolutions;
	if (image.variants?.gif) {
		source = image.variants.gif.source;
		resolutions = image.variants.gif.resolutions;
	} else {
		source = image.source;
		resolutions = image.resolutions;
	}
	const srcsetWidths = [320, 640, 1080];
	if (!srcsetWidths.includes(source.width)) {
		resolutions.push(source);
		srcsetWidths.push(source.width);
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

type GalleryData =
	| (RedditImageData & {
			outboundUrl?: string;
			caption?: string;
			srcsetAndSizes: { srcset: string; sizes: string } | null;
	  } & { type: 'image' | 'gif' })
	| (RedditImageData & {
			outboundUrl?: string;
			caption?: string;
			srcsetAndSizes: { srcset: string; sizes: string } | null;
	  } & { type: 'mp4' });
export function getGalleryData(submission: SubmissionData) {
	if (!submission.is_gallery || !submission.gallery_data || !submission.media_metadata) {
		return [];
	}
	if (!submission.media_metadata) return [];

	const res: GalleryData[] = [];

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
			const img = {
				source,
				resolutions,
				id: galleryItem.id,
				caption: item.caption,
				outboundUrl: item.outbound_url
			};
			res.push({ ...img, srcsetAndSizes: getSrcsetAndSizes(img), type: 'image' });
		} else if (galleryItem.e === 'AnimatedImage') {
			const resolutions =
				galleryItem.p?.map((p) => {
					return {
						height: p.y,
						width: p.x,
						url: p.u
					};
				}) ?? [];
			let source;
			let type: 'gif' | 'mp4';
			if (galleryItem.s.mp4) {
				source = {
					height: galleryItem.s.x,
					width: galleryItem.s.y,
					url: galleryItem.s.mp4
				};
				type = 'mp4';
			} else {
				source = {
					height: galleryItem.s.x,
					width: galleryItem.s.y,
					url: galleryItem.s.gif
				};
				type = 'gif';
			}

			const img = {
				source,
				resolutions,
				id: galleryItem.id,
				caption: item.caption,
				outboundUrl: item.outbound_url
			};

			res.push({
				...img,
				srcsetAndSizes: getSrcsetAndSizes(img),
				type
			});
		}
	}

	return res;
}
