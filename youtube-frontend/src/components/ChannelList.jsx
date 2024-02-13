import React, { useState,useEffect } from "react";
import ChannelCardList from "./ChannelCardList";

import ChannelApiService from "../services/channel";

import { useNavigate } from 'react-router-dom';

import '../styles/ChannelList.css'

const ChannelList = () => {
    const [channels,setChannels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getChannels();
    }, []);

    const viewChannel = (channelId) => {
        navigate(`/channels/${channelId}`);
    }

    const deleteChannel = async(channelId) => {
        try {
            await ChannelApiService.deleteChannel(channelId);
            setChannels((prevChannels) => prevChannels.filter((channel) => channel.channelId !== channelId))
    
        } catch (error) {
            console.error('Channel Saving failed:', error);
        }   
    }

    const getChannels = async() => {
        try {
            const response = await ChannelApiService.getChannels();
            console.log(response)

            if (Array.isArray(response.data)) {
                setChannels(response.data);
            } else {
                console.error('Invalid response format. Expected an array.');
            }
        } catch (error) {
            console.error('An error has ocurred:', error);
        }
    }
    
    return(
        <div>
            <h2>Your white-listed Channels</h2>
            <ChannelCardList 
                channels={channels}
                deleteChannel={deleteChannel}
                viewChannel={viewChannel} 
            />
        </div>
    )
}

export default ChannelList;