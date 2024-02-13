import React, { useState, useEffect } from 'react';
import VideoApiService from '../services/video';
import VideoCardList from './VideoCardList';
import '../styles/WhiteListedVideos.css';

const WhiteListedVideos = () => {
    const [videos,setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);


    const getVideos = async() => {
        try {
            const response = await VideoApiService.getAllWhiteListedVideos();
            console.log(response)

            if (Array.isArray(response.data)) {
                setVideos(response.data);
            } else {
                console.error('Invalid response format. Expected an array.');
            }
        } catch (error) {
            console.error('An error has ocurred:', error);
        }
    }

    const removeWhiteListing = async (videoId) => {
        try {
            await VideoApiService.removeWhiteList(videoId);
    
            // Filter out the video after the API call is successful
            setVideos((prevVideos) => prevVideos.filter((video) => video.videoId !== videoId));
        } catch (error) {
            console.error('Channel Saving failed:', error);
        }
    }
    

    const createNotepad = () => {
        const notepadContent = videos.map((video) => `https://www.youtube.com/watch?v=${video.videoId}`).join('\n');
        const blob = new Blob([notepadContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'YouTubeLinks.txt';
        a.click();

        // Clean up
        URL.revokeObjectURL(url);
    }

    const deleteVideo = async (videoId) => {
        try {
          await VideoApiService.deleteVideo(videoId);
    
          setVideos((prevVideos) => prevVideos.filter((video) => video.videoId !== videoId));
        } catch (error) {
          console.error('Channel Saving failed:', error);
        }
      };


    return(
        <div className="white-listed-videos">
            <h2>Your White Listed videos</h2>
            <VideoCardList videos={videos} removeWhiteList={removeWhiteListing} deleteVideo={deleteVideo}/>
            <button onClick={createNotepad}>Create Notepad</button>
        </div>
    )
}

export default WhiteListedVideos;
