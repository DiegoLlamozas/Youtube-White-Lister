const axios = require('axios');
const { google } = require('googleapis')
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = "AIzaSyA2-XYxP9teVNRAz3edo96En29Xyl8PvnU";

const youtube = google.youtube({
    version:"v3",
    auth: apiKey,
})

const getChannelByName = async(searchQuery) => {
    const type = 'channel';

    const response = await youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        type: type,
    })
    
    return response;
}

module.exports = {
    getChannelByName,
    baseApiUrl,
}