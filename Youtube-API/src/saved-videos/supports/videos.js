const buildVideoResponse = (video) => {
   const thumbnailResponse = {
        default: {
          url: video.thumbnails[0]?.url,
        },
        medium: {
          url: video.thumbnails[1]?.url,
        },
        high: {
          url: video.thumbnails[2]?.url,
        },
      };
  
    const videoResponse = {
      title: video.title,
      videoId: video.videoId,
      description: video.description,
      publishedAt: video.publishedAt,
      channelId: video.channelId,
      whiteListed: video.whiteListed,
      thumbnails: thumbnailResponse,
    };
  
    return videoResponse;
  };

const buildVideosResponse = (videos) => {
    const mappedVideos = videos.map((video) =>{
        const createdVideo = buildVideoResponse(video);
        return createdVideo;
    } );
    return mappedVideos;
}

module.exports = {
    buildVideoResponse,
    buildVideosResponse,
}