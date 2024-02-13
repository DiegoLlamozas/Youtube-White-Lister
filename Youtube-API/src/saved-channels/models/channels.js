const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');



const Channel = sequelize.define('channels', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    publishedAt: {
        type: DataTypes.DATE,
    },
    customUrl: {
        type: DataTypes.STRING,
    },
    lastTimeFetched: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['channelId']
        }
    ],
});

const validThumbnailTypes = ['default', 'medium', 'high'];

const ChannelThumbnail = sequelize.define('ChannelThumbnail', {
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
            fields: ['storedChannelId', 'type']
        }
    ],
});

// Define the association between Channel and ChannelThumbnail
Channel.hasMany(ChannelThumbnail, { as: 'thumbnails', foreignKey: 'storedChannelId', onDelete: 'CASCADE' });
ChannelThumbnail.belongsTo(Channel, { foreignKey: 'storedChannelId', as: 'channel' });

module.exports = {
    Channel,
    ChannelThumbnail
};
