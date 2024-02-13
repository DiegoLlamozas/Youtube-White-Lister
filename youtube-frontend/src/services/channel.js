import http from "./http";

export default class ChannelApiService {
    static getChannelByName(searchQuery) {
      return http.get(`/api/channels/search?search_query=${searchQuery}`);
    }

  
    static storeChannel(channelId) {
      return http.post('/api/channels', { channelId });
    }
  
    static storeAllChannelVideos(channelId, maxResults) {
      return http.post(`/api/channels/${channelId}/fetch?max_fetch=${maxResults}`, { channelId, maxResults });
    }
  
    static getAllChannelSavedVideos(channelId) {
      return http.get(`/api/channels/${channelId}/videos`);
    }
  
    static deleteChannel(channelId) {
      return http.delete('/api/channels/delete', { data: { channelId } });
    }

    static getChannels(){
      return http.get('/api/channels');
    }

    static getStoredChannelByChannelId(channelId){
      return http.get(`/api/channels/by-id/${channelId}`);
    }

    static whiteListAllChannelVideos(channelId){
      return http.put(`/api/channels/${channelId}/white-list-all`)
    }
  }