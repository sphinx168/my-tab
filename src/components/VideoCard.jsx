import { getYouTubeEmbedUrl } from '../data/videoUtils';

export default function VideoCard({ video }) {
  const embedUrl = getYouTubeEmbedUrl(video.url);

  return (
    <article className="card">
      <div className="card-head">
        <h3 className="card-title">{video.title}</h3>
      </div>

      {embedUrl ? (
        <div className="video-embed-wrapper">
          <iframe
            src={embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a className="song-link-item" href={video.url} target="_blank" rel="noreferrer">
          <span className="link-name">{video.title}</span>
        </a>
      )}

      {video.note && <p className="video-note">{video.note}</p>}
    </article>
  );
}
