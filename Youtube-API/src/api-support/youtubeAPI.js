const axios = require('axios');
const { google } = require('googleapis')
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = "YOUR_API_KEY";

const youtube = google.youtube({
    version:"v3",
    auth: apiKey,
})

const getChannelByName = async(searchQuery) => {
    const type = 'channel';

    let response = await youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        type: type,
    })

    response = response.data.items.map((item) => item.snippet);    
    return response;
}

const getChannelByChannelId = async (channelId) => {
    const type = 'channel';

    let response = await youtube.channels.list({
        part: 'snippet',
        id: channelId,
    });

    response = response.data.items[0]

    console.log(response)
    
    return response;
}

const fetchAllVideos = async (channelId, maxResults = 50, lastTimeFetched) => {
    const type = 'video';

    // Fetch all videos from the channel using youtube.search.list
    let nextPageToken = null;
    let allVideos = [];
    let processedVideoKeys = []; // Keep track of processed video keys

    const delay = 1000;

    do {
        const searchResponse = await youtube.search.list({
            part: 'snippet',
            type: type,
            channelId: channelId,
            maxResults: maxResults,
            pageToken: nextPageToken,
            publishedAfter: lastTimeFetched || undefined,
        });

        // Extract the 'items' array from the response
        const videos = searchResponse.data.items.map(item => ({
            videoId: item.id.videoId,
            snippet: item.snippet,
        }));

        // Filter out videos that have already been processed
        const uniqueVideos = videos.filter(video => !processedVideoKeys.includes(video.videoId));

        // Concatenate the unique videos to the allVideos array
        allVideos.push(...uniqueVideos);

        // Update the list of processed video keys
        processedVideoKeys.push(...uniqueVideos.map(video => video.videoId));

        nextPageToken = searchResponse.data.nextPageToken;

        // Log progress
        console.log(`Fetched ${uniqueVideos.length} videos. Total: ${allVideos.length} videos.`);

        // Introduce a delay to avoid hitting API quotas
        await new Promise(resolve => setTimeout(resolve, delay));

    } while (nextPageToken);

    // Log completion
    console.log('Fetch operation completed.');

    console.log(allVideos);

    return allVideos;
};

module.exports = {
    getChannelByName,
    getChannelByChannelId,
    fetchAllVideos,
};
