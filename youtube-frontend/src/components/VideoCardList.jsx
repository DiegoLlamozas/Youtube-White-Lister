import React from 'react';
import VideoCard from './VideoCard';
import '../styles/VideoCardList.css';

const VideoCardList = ({ videos, whiteList, removeWhiteList, deleteVideo }) => {
    return (
        <ul className="video-card-list">
            {videos && videos.map((video) => (
                <li className="video-card-item" key={video.videoId}>
                    <VideoCard
                        video={video}
                        whiteList={whiteList}
                        removeWhiteList={removeWhiteList}
                        deleteVideo={deleteVideo}
                    />
                </li>
            ))}
        </ul>
    );
};

export default VideoCardList;

  

