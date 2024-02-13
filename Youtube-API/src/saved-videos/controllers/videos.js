const YoutubeApi = require('../../api-support/youtubeAPI');
const VideoService = require('../services/videos');
const VideoSupport = require('../supports/videos')

const storeAllChannelVideos = async(req,res,next) => {
    const { channelId,maxResults } = req.body;

    try {
        const storedChannels = await VideoService.storeAllChannelVideos(channelId,maxResults);
        if (storedChannels.error) {
            return res.status(400).send(storedChannels.error);
        }
        return storedChannels
    } catch (err) {
        next(err);
    }
}

const whiteListVideo = async(req,res,next) => {
    const { videoId } = req.body;

    try {
        const video = await VideoService.whiteListVideo(videoId);
        if (video.error) {
            return res.status(400).send(video.error);
        }
        const videoResponse = VideoSupport.buildVideoResponse(video);
        return res.status(200).send(videoResponse);
    } catch (err) {
        next(err);
    }
}

const removeWhiteList = async(req,res,next) => {
    const { videoId } = req.body;

    try {
        const video = await VideoService.removeWhiteList(videoId);
        if (video.error) {
            return res.status(400).send(video.error);
        }
        const videoResponse = VideoSupport.buildVideoResponse(video);
        return res.status(200).send(videoResponse);
    } catch (err) {
        next(err);
    }
}

const getAllChannelSavedVideos = async(req,res,next) => {
    const { channelId } = req.body;
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

const getAllWhiteListedVideos = async(req,res,next) => {
    try {
        const whiteListedVideos = await VideoService.getAllWhiteListedVideos();
        console.log(whiteListedVideos);
        if (whiteListedVideos.error) {
            return res.status(400).send(whiteListedVideos.error);
        }
        const whiteListedVideosResponse = VideoSupport.buildVideosResponse(whiteListedVideos);
        console.log(whiteListedVideosResponse);
        return res.status(200).send(whiteListedVideosResponse);
    } catch (err) {
        next(err)
    }
}


const deleteVideo = async(req,res,next) => {
    const { videoId } = req.body;

    try {
        const deletedVideo = await VideoService.deleteVideo(videoId);
        if (deletedVideo.error) {
            return res.status(400).send(deletedVideo.error);
        }
        return res.status(200).send(deletedVideo); 
    } catch (err) {
       next(err) 
    }
}

const getAllVideos = async(req,res,next) => {
    try {
        const videos = await VideoService.getAllVideos();
        if (videos.error) {
            return res.status(400).send(videos.error);
        }
        const videosResponse = VideoSupport.buildVideosResponse(videos);
        return videosResponse;
    } catch (err) {
        next(err);
    }
}

const getVideo = async(req,res,next) => {
    const { videoId } = req.body;
    try {
        const video = await VideoService.getVideo(videoId);
        if (video.error) {
            return res.status(400).send(video.error);
        }

        const videoResponse = VideoSupport.buildVideoResponse(video);
        return videoResponse;
    } catch (err) {
        next(err)
    }
}


module.exports = {
    storeAllChannelVideos,
    whiteListVideo,
    removeWhiteList,
    getAllChannelSavedVideos,
    getAllWhiteListedVideos,
    deleteVideo,
    getAllVideos,
    getVideo
}