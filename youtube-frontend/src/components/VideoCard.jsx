import React from 'react';
import VideoInfo from './VideoInfo';
import '../styles/VideoCard.css';

const VideoCard = ({ video, whiteList, removeWhiteList, deleteVideo }) => {
    return (
        <li className="video-card" key={video?.videoId}>
            {video && (
                <div className="video-info">
                    <VideoInfo video={video} />
                </div>
            )}
            <div className="button-container">
                {video && video?.whiteListed === 'nonListed' && (
                    <button className="button" onClick={() => whiteList(video?.videoId)}>+</button>
                )}
                {video && video?.whiteListed === 'listed' && (
                    <button className="button" onClick={() => removeWhiteList(video?.videoId)}>-</button>
                )}
                <button className="button delete-button" onClick={() => deleteVideo(video?.videoId)}>X</button>
            </div>
        </li>
    );
};

export default VideoCard;
