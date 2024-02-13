const router = require('express').Router({ mergeParams: true });

const { validate } = require('./../../config/validate');
const { checkSchema } = require('express-validator');

const { getChannelByName,getChannelByChannelId,storeChannel,storeAllChannelVideos, getAllChannelSavedVideos, deleteChannel, getChannels, getStoredChannelByChannelId, whiteListAllChannelVideos } = require('../controllers/channels');



router.get('/search',getChannelByName);
router.get('/get-by-key', getChannelByChannelId);
router.post('/:channelId/fetch', storeAllChannelVideos);
router.post('/', storeChannel);
router.get('/', getChannels)
router.get('/:channelId/videos', getAllChannelSavedVideos);
router.delete('/delete', deleteChannel);
router.get('/by-id/:channelId', getStoredChannelByChannelId);
router.put('/:channelId/white-list-all', whiteListAllChannelVideos);

module.exports = {
    router,
};