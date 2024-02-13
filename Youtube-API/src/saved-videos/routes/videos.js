const router = require('express').Router({ mergeParams: true });

const { validate } = require('../../config/validate');
const { checkSchema } = require('express-validator');

const { storeAllChannelVideos,whiteListVideo, getAllWhiteListedVideos, deleteVideo, getAllVideos, getVideo, removeWhiteList } = require('../../saved-videos/controllers/videos');

router.post('/', storeAllChannelVideos);
router.put('/',whiteListVideo);
router.put('/remove-white-list',removeWhiteList);
router.get('/white-list', getAllWhiteListedVideos);
router.delete('/', deleteVideo);
router.get('/all', getAllVideos);
router.get('/',getVideo);


module.exports = {
    router,
}
