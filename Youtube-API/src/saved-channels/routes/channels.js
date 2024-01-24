const router = require('express').Router({ mergeParams: true });

const { validate } = require('./../../config/validate');
const { checkSchema } = require('express-validator');

const { callApi } = require('../controllers/channels');

router.get('/search-with-google-api',callApi)

module.exports = {
    router,
};