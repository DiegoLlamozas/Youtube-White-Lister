const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const { Channel } = require('../../saved-channels/models/channels');

const validListingState = ['listed','nonListed']

const Video = sequelize.define('videos', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    videoId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    publishedAt: {
        type: DataTypes.DATE,
    },
    whiteListed: {
        type: DataTypes.ENUM(...validListingState),
        allowNull: false,
    },
    channelId:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['videoId']
        }
    ],
});

const validThumbnailTypes = ['default', 'medium', 'high'];

const VideoThumbnail = sequelize.define('VideoThumbnail', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...validThumbnailTypes),
        allowNull: false,
    }, 
}, {
    indexes: [
        {
            unique: true,
            fields: ['storedVideoId', 'type']
        }
    ],
});

// Define the association between Video and VideoThumbnail
Video.hasMany(VideoThumbnail, {
    foreignKey: 'storedVideoId',
    as: 'thumbnails',
    onDelete: 'CASCADE',
});
VideoThumbnail.belongsTo(Video, { foreignKey: 'storedVideoId', as:'video' });

// Add onDelete: 'CASCADE' to the association definition in Video model
Channel.hasMany(Video, {
    foreignKey: 'storedChannelId',
    as: 'videos',
    onDelete: 'CASCADE', 
});

Video.belongsTo(Channel, { foreignKey: 'storedChannelId', as:'channel' });

module.exports = {
    Video,
    VideoThumbnail
};
