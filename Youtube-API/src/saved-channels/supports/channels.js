const buildChannelResponse = (channel) => {
    const thumbnailResponse = {
        default: {
          url: channel.thumbnails[0]?.url,
        },
        medium: {
          url: channel.thumbnails[1]?.url,
        },
        high: {
          url: channel.thumbnails[2]?.url,
        },
      };

    const channelResponse = {
        title: channel.title,
        channelId: channel.channelId,
        description: channel.description,
        publishedAt: channel.publishedAt,
        customUrl: channel.customUrl,
        lastTimeFetched: channel.lastTimeFetched,
        thumbnails: thumbnailResponse,
    };

    return channelResponse;
};

const buildChannelsResponse = (channels) => {
    const mappedChannels = channels.map((channel) => {
        const createdChannel = buildChannelResponse(channel);
        return createdChannel;
    });
    return mappedChannels;
};


module.exports = {
    buildChannelResponse,
    buildChannelsResponse,
};
