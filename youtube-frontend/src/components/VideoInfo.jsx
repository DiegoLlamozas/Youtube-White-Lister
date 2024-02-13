import React from "react";
import '../styles/VideoInfo.css'; // Import CSS file

const VideoInfo = ({ video }) => {
    const convertToUrl = (videoId) => {
        return `https://www.youtube.com/watch?v=${videoId}`;
    };

    return (
        <div className="video-info"> {/* Add classNames */}
            {video && (
                <>
                    <a href={convertToUrl(video?.videoId)} target="_blank" rel="noopener noreferrer">
                        <img src={video?.thumbnails.default.url} alt={video?.title} />
                    </a>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <p>{video.publishedAt}</p>
                </>
            )}
        </div>
    );
};

export default VideoInfo;
