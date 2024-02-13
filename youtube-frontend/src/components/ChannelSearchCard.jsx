import React from "react";
import ChannelInfo from "./ChannelInfo";
import '../styles/ChannelSearchCard.css';

const ChannelSearchCard = ({ channel, storeChannel }) => {
    return (
        <div className="channel-search-card">
            <div className="channel-info">
                <ChannelInfo channel={channel} />
            </div>
            <button className="channel-search-button" onClick={() => storeChannel(channel.channelId)}>+</button>
        </div>
    );
}

export default ChannelSearchCard;
