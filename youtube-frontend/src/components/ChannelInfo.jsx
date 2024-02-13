import React from "react";
import '../styles/ChannelInfo.css'

const ChannelInfo = ({channel}) => {
    return(
        <div className="channel-info"> {/* Add classNames */}
            {channel && (
                <>
                    <img src={channel?.thumbnails?.default?.url} alt={channel?.title} />
                    <h3>{channel.title}</h3>
                    <p className="channel-info-description">{channel.description}</p>
                    <span><b>{channel.publishedAt}</b></span>
                </>
            )}
        </div>
    )
}

export default ChannelInfo;
