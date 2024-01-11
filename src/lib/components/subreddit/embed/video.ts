import type { SubmissionData } from 'jsrwrap/types';

export function isRedditVideo(submission: SubmissionData) {
	if (!submission.is_video || !submission.media || !submission.media.reddit_video) return false;

	if (submission.post_hint !== 'hosted:video') return false;
	return true;
}

export async function getRedditVideoLinks(baseUrl: string): Promise<{
	videoLinks: { baseUrl: string; width: string; height: string }[];
	audioLink: string | null;
}> {
	const metadataUrl = `${baseUrl}DASHPlaylist.mpd`;
	const res = await fetch(metadataUrl);
	const xml = await res.text();

	const alwaysArray = ['MPD.Period.AdaptationSet', 'MPD.Period.AdaptationSet.Representation'];

	console.log(xml);

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, 'text/xml');
	console.log(xmlDoc);

	const videoAdaptationSet = xmlDoc.querySelector('AdapationSet[contextType="video"]');
	const audioAdaptationSet = xmlDoc.querySelector('AdapationSet[contextType="audio"]');
	videoAdaptationSet?.querySelectorAll('Representation');

	type MPD = {
		MPD: {
			Period: {
				AdaptationSet: {
					'@_contentType': string;
					Representation: {
						'@_width': string;
						'@_height': string;
						BaseURL: string;
					}[];
				}[];
			};
		};
	};

	return [] as any;

	// const obj: MPD = parser2.parse(xml);

	// const adaptationSets = obj.MPD.Period.AdaptationSet;

	// let videoAdaptationSet: MPD['MPD']['Period']['AdaptationSet'][0] = {
	// 	'@_contentType': '',
	// 	Representation: []
	// };
	// let audioAdaptationSet;
	// for (let i = 0; i < adaptationSets.length; i++) {
	// 	if (adaptationSets[i]['@_contentType'] === 'video') {
	// 		videoAdaptationSet = adaptationSets[i];
	// 	} else if (adaptationSets[i]['@_contentType'] === 'audio') {
	// 		audioAdaptationSet = adaptationSets[i];
	// 	}
	// }

	// const videoBaseUrls: { baseUrl: string; width: string; height: string }[] = [];
	// for (let i = 0; i < videoAdaptationSet['Representation'].length; i++) {
	// 	videoBaseUrls.push({
	// 		baseUrl: videoAdaptationSet['Representation'][i]['BaseURL'],
	// 		width: videoAdaptationSet['Representation'][i]['@_width'],
	// 		height: videoAdaptationSet['Representation'][i]['@_height']
	// 	});
	// }

	// let audioBaseUrl: string | null = null;
	// if (audioAdaptationSet) {
	// 	audioBaseUrl = audioAdaptationSet['Representation'][0]['BaseURL'];
	// }

	// return { videoLinks: videoBaseUrls, audioLink: audioBaseUrl };
}
