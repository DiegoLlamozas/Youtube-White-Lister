const { Video, VideoThumbnail } = require('../models/videos');
const { Channel } = require('../../saved-channels/models/channels');
const YoutubeApi = require('../../api-support/youtubeAPI');

const storeVideo = async (data,existingChannel) => {
    console.log(data);

    const videoExist = await Video.findOne({ where: { videoId: data.videoId } });

    if (videoExist) {
        return;
    }

    const storedVideo = await Video.create({
        title: data.snippet.title,
        videoId: data.videoId,
        description: data.snippet.description,
        publishedAt: data.snippet.publishedAt,
        channelId: data.snippet.channelId,
        storedChannelId: existingChannel.id,
        whiteListed:'nonListed'
    });

    const defaultThumbnail = await VideoThumbnail.create({
        url: data.snippet.thumbnails.default.url,
        type: 'default',
        storedVideoId: storedVideo.id,
    })

    const mediumThumbnail = await VideoThumbnail.create({
        url: data.snippet.thumbnails.medium.url,
        type: 'medium',
        storedVideoId: storedVideo.id,
    })

    const highThumbnail = await VideoThumbnail.create({
        url: data.snippet.thumbnails.medium.url,
        type: 'high',
        storedVideoId: storedVideo.id,
    })

    const result = await Video.findOne({ where: { 
        videoId: storedVideo.videoId 
    },  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails', 
        },
    ], })

    return result;
};

const storeAllChannelVideos = async (channelId, maxResults) => {
    const storedChannel = await Channel.findOne({ where: { channelId: channelId } });

    if (!storedChannel) {
        return [];
    }

    const videos = await YoutubeApi.fetchAllVideos(channelId, maxResults, storedChannel.lastTimeFetched);

    const storedVideos = await Promise.all(videos.map(async (video) => {
        const storedVideo = await storeVideo(video, storedChannel);
        return storedVideo;
    }));

    return storedVideos;
};

const whiteListVideo = async (videoId) => {
    const existingVideo = await Video.findOne({ where: { videoId: videoId } });

    if (!existingVideo) {
        return { error: 'You don\'t have this video stored' };
    }

    if (existingVideo.whiteListed === 'listed') {
        return { error: 'Video Already White Listed' };
    }

    existingVideo.whiteListed = 'listed';

    await existingVideo.save();


    const result = await Video.findOne({ where: { 
        videoId: existingVideo.videoId 
    },  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails',
        },
    ], })

    return result;
};

const getAllChannelSavedVideos = async (channelId) => {
    const existingChannel = await Channel.findOne({ where: { channelId: channelId } });

    if (!existingChannel) {
        return { error: 'You don\'t have this channel stored' };
    }

    const channelVideos = await Video.findAll({ where: { channelId: channelId } ,  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails', 
        },
    ],  });

    return channelVideos;
};

const getAllWhiteListedVideos = async () => {
    const whiteListedVideos = await Video.findAll({ where: { whiteListed: 'listed'},  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails', 
        },
    ], });

    return whiteListedVideos;
};


const deleteVideo = async (videoId) => {
    const video = await Video.findOne({ where: { videoId: videoId } });

    if (!video) {
        return { error: `Channel with key ${videoId} not found on your database.` };
    }

    await video.destroy();
    return { message: 'Video deleted successfully' };
};

const getAllVideos = async () => {
    const videos = await Video.findAll({ include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails', 
        },
    ]});
    
    return videos;
};

const getVideo = async (videoId) => {
    const video = await Video.findOne({ where: { videoId: videoId} ,  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails', 
        },
    ], });
    if (!video) {
        return { error: `Oops, it seems like this video isn't stored on your database :(` };
    }
    return video;
};

const removeWhiteList = async(videoId) => {
    const existingVideo = await Video.findOne({ where: { videoId: videoId } });

    if (!existingVideo) {
        return { error: 'You don\'t have this video stored' };
    }

    if (existingVideo.whiteListed === 'nonListed') {
        return { error: 'Video is not white listed' };
    }

    existingVideo.whiteListed = 'nonListed';

    await existingVideo.save();


    const result = await Video.findOne({ where: { 
        videoId: existingVideo.videoId 
    },  include: [
        {
            model: VideoThumbnail,
            as: 'thumbnails',
        },
    ], })

    return result;
}

module.exports = {
    storeAllChannelVideos,
    whiteListVideo,
    removeWhiteList,
    getAllChannelSavedVideos,
    getAllWhiteListedVideos,
    deleteVideo,
    getAllVideos,
    getVideo,
};
