// 解析 youtu.be/<id> 與 youtube.com/watch?v=<id> 兩種網址格式，回傳可嵌入播放器的網址
export function getYouTubeEmbedUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');
  let videoId = null;

  if (host === 'youtu.be') {
    videoId = parsed.pathname.slice(1);
  } else if (host === 'youtube.com' || host === 'm.youtube.com') {
    videoId = parsed.searchParams.get('v');
  }

  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}
