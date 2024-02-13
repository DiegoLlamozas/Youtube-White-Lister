import React, { useState, useEffect } from 'react';
import VideoCardList from './VideoCardList';
import ChannelApiService from '../services/channel';
import VideoApiService from '../services/video';
import { useParams } from 'react-router-dom';
import ChannelViewCard from './ChannelViewCard';
import '../styles/ChannelView.css';

const ChannelView = () => {
  const { channelId } = useParams();
  console.log(channelId)

  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState({});
  const [maxValue, setMaxValue] = useState(50);

  const fetchChannelVideos = async () => {
    try {

      const response = await ChannelApiService.storeAllChannelVideos(channelId,maxValue);
      console.log(response)
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        console.error('Invalid response format. Expected an array.');
      }
    } catch (error) {
      console.error('An error has occurred:', error);
    }
  };

  const whiteListVideos = async (videoId) => {
    try {
      await VideoApiService.whiteListVideo(videoId);
      const response = await ChannelApiService.getAllChannelSavedVideos(channelId);

      setVideos(response.data);
    } catch (error) {
      console.error('An error has occurred:', error);
    }
  };

  const removeWhiteListing = async (videoId) => {
    try {
      await VideoApiService.removeWhiteList(videoId);

      const response = await ChannelApiService.getAllChannelSavedVideos(channelId);

      // Filter out the video after the API call is successful
      setVideos(response.data);
    } catch (error) {
      console.error('Channel Saving failed:', error);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await VideoApiService.deleteVideo(videoId);

      setVideos((prevVideos) => prevVideos.filter((video) => video.videoId !== videoId));
    } catch (error) {
      console.error('Channel Saving failed:', error);
    }
  };

  const getChannel = async () => {
    try {
      const channelResponse = await ChannelApiService.getStoredChannelByChannelId(channelId)
      setChannel(channelResponse.data);
    } catch (error) {
      console.error('Error fetching channel:', error);
    }
  };

  const getVideos = async () => {
    try {
      const response = await ChannelApiService.getAllChannelSavedVideos(channelId);
      if (response.error) {
        console.log(response.error);
      }
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        console.error('Invalid response format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const whiteListAllVideos = async() => {
    try {
      const response = await ChannelApiService.whiteListAllChannelVideos(channelId);
      if (response.error) {
        console.log(response.error);
      }
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        console.error('Invalid response format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  useEffect(() => {
    getChannel();
    getVideos();
  }, []);

  return (
    <div className="channel-view">
      <form className="channel-form">
            <label>
              <input
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
              />
            </label>
            <br />
            <button onClick={fetchChannelVideos}>Start Fetching</button>
        </form>   
      <ChannelViewCard channel={channel}/>
      <VideoCardList videos={videos} whiteList={whiteListVideos} removeWhiteList={removeWhiteListing} deleteVideo={deleteVideo}/>
      <button onClick={whiteListAllVideos}>Whitelist All Videos</button>
    </div>
  );
};

export default ChannelView;
