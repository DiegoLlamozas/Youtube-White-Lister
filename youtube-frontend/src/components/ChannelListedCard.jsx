import React from "react";
import ChannelInfo from "./ChannelInfo";
import '../styles/ChannelListedCard.css';

const ChannelListedCard = ({ channel, deleteChannel, viewChannel }) => {
    return (
        <div className="channel-listed-card">
            <div className="channel-info">
                <ChannelInfo channel={channel} />
            </div>
            <div className="channel-action-buttons">
                <button onClick={() => deleteChannel(channel.channelId)}>X</button>
                <button onClick={() => viewChannel(channel.channelId)}>O</button>
            </div>
        </div>
    );
}

export default ChannelListedCard;
