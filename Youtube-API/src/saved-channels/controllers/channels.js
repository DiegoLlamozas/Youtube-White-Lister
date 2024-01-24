const YoutubeApi = require('../../api-support/youtube-api/services/youtubeAPI')

const callApi = async(req,res,next) => {
    const searchQuery = req.query.search_query;

    try {
        const channels = await YoutubeApi.getChannelByName(searchQuery)
        if (channels.error) {
            return res.status(400).send(channels.error);
        }
        return res.status(200).send(channels);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    callApi,
}