import React, { useState } from "react";
import ChannelInfo from "./ChannelInfo";
import '../styles/ChannelViewCard.css';

const ChannelViewCard = ({ channel }) => {  
    return (
        channel && (
            <div className="channel-view-card">
                <div className="channel-info">
                    <ChannelInfo channel={channel} />
                </div>
            </div>
        )
    );
};

export default ChannelViewCard;
