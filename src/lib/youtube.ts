export type ShortItem = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
};

const FALLBACK_SHORTS: ShortItem[] = [1, 2, 3].map((n) => ({
  id: `placeholder-${n}`,
  title: `Short #${n} — Bientôt en ligne`,
  thumbnail: '/images/short-placeholder.jpg',
  url: 'https://www.youtube.com/@votre-chaine/shorts'
}));

export async function getLatestShorts(): Promise<ShortItem[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const channelId = import.meta.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return FALLBACK_SHORTS;

  const endpoint = new URL('https://www.googleapis.com/youtube/v3/search');
  endpoint.searchParams.set('key', apiKey);
  endpoint.searchParams.set('channelId', channelId);
  endpoint.searchParams.set('part', 'snippet');
  endpoint.searchParams.set('order', 'date');
  endpoint.searchParams.set('maxResults', '8');
  endpoint.searchParams.set('type', 'video');

  try {
    const response = await fetch(endpoint.toString());
    if (!response.ok) return FALLBACK_SHORTS;

    const data = await response.json();
    const shorts = (data.items ?? [])
      .filter((item: any) => item?.snippet?.title && item?.id?.videoId)
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url ?? '/images/short-placeholder.jpg',
        url: `https://www.youtube.com/shorts/${item.id.videoId}`
      }))
      .slice(0, 3);

    return shorts.length ? shorts : FALLBACK_SHORTS;
  } catch {
    return FALLBACK_SHORTS;
  }
}
