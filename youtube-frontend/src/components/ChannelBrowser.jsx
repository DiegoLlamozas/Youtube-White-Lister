import React, { useState } from "react";
import ChannelApiService from "../services/channel";
import ChannelSearchList from "./ChannelSearchList";
import '../styles/ChannelBrowser.css';

const ChannelBrowser = () => {
    const [channels, setChannels] = useState([]);
    const [channel, setChannel] = useState('');

    const handleBrowsing = async (e) => {
        e.preventDefault();
    
        try {
            const response = await ChannelApiService.getChannelByName(channel);
            console.log(response); // Log the response to check its structure
    
            if (Array.isArray(response.data)) {
                setChannels(response.data);
            } else {
                console.error('Invalid response format. Expected an array.');
            }
        } catch (error) {
            console.error('Channel Browsing failed:', error);
        }
    }
    
    const handleWhiteListing = async (channelId) => {
        try {
            await ChannelApiService.storeChannel(channelId);

        } catch (error) {
            console.error('Channel Saving failed:', error);
        }
    }

    return (
        <div className="channel-browser">
            <h2>Start Looking for Good Channels</h2>
            <form onSubmit={handleBrowsing}>
                <label>
                    <input
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Start</button>
            </form>

            <ChannelSearchList
                channels={channels}
                storeChannel={handleWhiteListing}
            />
        </div>
    )
}

export default ChannelBrowser;
