const YoutubeApi = require('../../api-support/youtubeAPI')
const ChannelService = require('../services/channels');
const ChannelSupport = require('../supports/channels');
const VideoService = require('../../saved-videos/services/videos')
const VideoSupport = require('../../saved-videos/supports/videos')

const getChannelByName = async(req,res,next) => {
    const searchQuery = req.query.search_query;
    
    try {
        const channels = await YoutubeApi.getChannelByName(searchQuery)
        if (channels.error) {
            return res.status(400).send(channels.error);
        }
        console.log(channels);

        return res.status(200).send(channels);

    } catch (err) {
        next(err);
    }
}

const getChannelByChannelId = async(req,res,next) => {
    const { channelId } = req.body;

    try {
        const channel = await YoutubeApi.getChannelByChannelId(channelId);
        console.log(channel)
        if (channel.error) {
            return res.status(400).send(channel.error);
        }
        //const channelResponse = ChannelSupport.buildChannelResponse(channel)
        return res.status(200).send(channel);
    } catch (err) {
        next(err)
    }
}

const storeChannel = async(req,res,next) => {
    const { channelId } = req.body;

    try {
        const storedChannel = await ChannelService.storeChannel(channelId);
        if (storedChannel.error) {
            return res.status(400).send(storedChannel.error);
        }
        const storedChannelResponse = ChannelSupport.buildChannelResponse(storedChannel);
        return res.status(200).send(storedChannelResponse);
        
    } catch (err) {
        next(err)
    }
}

const storeAllChannelVideos = async (req, res, next) => {
    const { channelId } = req.params; 
    const { maxResults } = req.query; 

    try {
        const videos = await ChannelService.storeAllChannelVideos(channelId, maxResults);
        console.log(videos);
        if (videos.error) {
            return res.status(400).send(videos.error);
        }
        const videosResponse = VideoSupport.buildVideosResponse(videos);
        console.log(videos);
        console.log(videosResponse);
        return res.status(200).send(videosResponse);
    } catch (err) {
        next(err);
    }
}


const getAllChannelSavedVideos = async(req,res,next) => {
    const { channelId } = req.params;
     try {
        const videos = await VideoService.getAllChannelSavedVideos(channelId);
        if (videos.error) {
            return res.status(400).send(videos.error);
        }
        const videosResponse = VideoSupport.buildVideosResponse(videos);
        return res.status(200).send(videosResponse);
     } catch (err) {
        next(err)
     }
}

const deleteChannel = async(req,res,next) => {
    const { channelId } = req.body;

    try {
        const deletedChannel = await ChannelService.deleteChannel(channelId);
        if (deletedChannel.error) {
            return res.status(400).send(deleteChannel.error);
        }
        return res.status(200).send(deletedChannel); 
    } catch (err) {
       next(err) 
    }
}

const getChannels = async(req,res,next) => {
    try {
        const channels = await ChannelService.getChannels();
        console.log(channels);
        
        if (channels.error) {
            return res.status(400).send(channels.error);
        }

        const channelsResponse = ChannelSupport.buildChannelsResponse(channels);
        console.log(channelsResponse);
        return res.status(200).send(channelsResponse) ;
    } catch (err) {
        next(err);
    }
}

const getStoredChannelByChannelId = async(req,res,next) => {
    const { channelId } = req.params;

    console.log(channelId);

    try {
        const channel = await ChannelService.getStoredChannelByChannelId(channelId);
        console.log(channel)
        if (channel.error) {
            console.log(channel.error)
            return res.status(400).send(channel.error);
        }
        const channelResponse = ChannelSupport.buildChannelResponse(channel);
        return res.status(200).send(channelResponse);
    } catch (error) {
        next(error)
    }
}

const whiteListAllChannelVideos = async(req,res,next) => {
    const { channelId } = req.params
    console.log(channelId);

    try {
        const whiteListedVideos = await ChannelService.whiteListAllChannelVideos(channelId)
        if (whiteListedVideos.error) {
            return res.status(400).send(whiteListedVideos.error);
        }
        const whiteListedVideosResponse = ChannelSupport.buildChannelsResponse(whiteListedVideos);

        return res.status(200).send(whiteListedVideosResponse);
    } catch (error) {
      next(error)  
    }


}

module.exports = {
    getChannelByName,
    getChannelByChannelId,
    storeChannel,
    storeAllChannelVideos,
    getAllChannelSavedVideos,
    deleteChannel,
    getChannels,
    getStoredChannelByChannelId,
    whiteListAllChannelVideos
}