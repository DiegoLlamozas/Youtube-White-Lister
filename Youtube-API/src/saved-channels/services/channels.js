const { Channel, ChannelThumbnail } = require('../models/channels');
const VideoService = require('../../saved-videos/services/videos');
const YoutubeApi = require('../../api-support/youtubeAPI');
const { Video, VideoThumbnail } = require('../../saved-videos/models/videos');

const storeChannel = async (channelId) => {
    const channel = await YoutubeApi.getChannelByChannelId(channelId);

    console.log(channel)

    const existingChannel = await Channel.findOne({ where: { channelId: channelId } });

    if (!channel) {
        return { error: `Channel with Id ${channelId} seems to not exist.` };
    }

    if (existingChannel) {
        console.log(existingChannel)
        return { error: 'An already stored channel cannot be store twice' };
    }

    const storedChannel = await Channel.create({
        title: channel.snippet.title,
        channelId: channel.id,
        description: channel.snippet.description,
        publishedAt: channel.snippet.publishedAt,
        customUrl: channel.snippet.customUrl,
        lastTimeFetched: null,
    });

    const defaultThumbnail = await ChannelThumbnail.create({
        url: channel.snippet.thumbnails.default.url,
        type: 'default',
        storedChannelId: storedChannel.id,
    })

    const mediumThumbnail = await ChannelThumbnail.create({
        url: channel.snippet.thumbnails.medium.url,
        type: 'medium',
        storedChannelId: storedChannel.id,
    })

    const highThumbnail = await ChannelThumbnail.create({
        url: channel.snippet.thumbnails.medium.url,
        type: 'high',
        storedChannelId: storedChannel.id,
    })

    const result = await Channel.findOne({ where: { channelId: channelId }, include: [{ model:ChannelThumbnail, as:'thumbnails' }] });;
    
    console.log(result)

    return result;
};

const storeAllChannelVideos = async (channelId, maxResults) => {
    const channel = await Channel.findOne({ where: { channelId: channelId }});

    if (!channel) {
        return { error: `Channel with key ${channelId} not found on your database.` };
    }

    const storedVideos = await VideoService.storeAllChannelVideos(channelId, maxResults);

    // Update the lastTimeFetched property to the current date
    channel.lastTimeFetched = new Date();
    // Save the updated channel back to the database
    await channel.save();

    return storedVideos;
};

const deleteChannel = async (channelId) => {
    const channel = await Channel.findOne({ where: { channelId: channelId } });

    if (!channel) {
        return { error: `Channel with key ${channelId} not found on your database.` };
    }

    await channel.destroy();
    return { message: 'Channel deleted successfully' };
};

const getChannels = async() => {
    const channels = Channel.findAll({include: [{ model:ChannelThumbnail, as:'thumbnails' }]})
    
    return channels
}

const getStoredChannelByChannelId = async(channelId) => {
    console.log(channelId);
    const channel = await Channel.findOne({ where:{ channelId:channelId }, include: [{ model:ChannelThumbnail, as:'thumbnails' }] })

    console.log(channel)

    if (!channel) {
        return { error: 'You don\'t have this channel saved'}
    }

    return channel;
}

const whiteListAllChannelVideos = async(channelId) => {
    const videos = await Video.findAll({ where: { channelId: channelId }, include: [{ model:VideoThumbnail, as:'thumbnails' }] });
    const mappedVideos = await Promise.all(videos.map(async (video) => {
        if (video.whiteListed === 'listed') {
            return video
        }

        const whiteListedVideo = await VideoService.whiteListVideo(video.videoId)
        return whiteListedVideo;
    }))  

    return mappedVideos;
} 

module.exports = {
    storeChannel,
    storeAllChannelVideos,
    deleteChannel,
    getChannels,
    getStoredChannelByChannelId,
    whiteListAllChannelVideos,
};
