import React from "react";
import ChannelListedCard from "./ChannelListedCard";
import '../styles/ChannelCardList.css';

const ChannelCardList = ({ channels, deleteChannel, viewChannel }) => {
    return (
        <ul className="channel-card-list">
            {channels.map((channel) => (
                <ChannelListedCard
                    channel={channel}
                    deleteChannel={deleteChannel}
                    viewChannel={viewChannel}
                    key={channel.channelId}
                />
            ))}
        </ul>
    );
}

export default ChannelCardList;
