import React from "react";
import ChannelSearchCard from "./ChannelSearchCard";
import '../styles/ChannelSearchList.css';

const ChannelSearchList = ({ channels, storeChannel }) => {
    return (
        <ul className="channel-search-list">
            {channels.map((channel) => (
                <li key={channel.channelId} className="channel-search-item">
                    <ChannelSearchCard channel={channel} storeChannel={storeChannel} />
                </li>
            ))}
        </ul>
    );
}

export default ChannelSearchList;
