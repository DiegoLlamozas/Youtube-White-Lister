import http from "./http";

export default class VideoApiService {
  static storeAllChannelVideos(channelId, maxResults) {
    return http.post('/api/videos', { channelId, maxResults });
  }

  static whiteListVideo(videoId) {
    return http.put('/api/videos', { videoId });
  }

  static getAllChannelSavedVideos(channelId) {
    return http.get('/api/videos/white-list', { channelId });
  }

  static getAllWhiteListedVideos() {
    return http.get('/api/videos/white-list');
  }

  static removeWhiteList(videoId) {
    return http.put('/api/videos/remove-white-list', { videoId });
  }

  static deleteVideo(videoId) {
    return http.delete('/api/videos', { data: { videoId } });
  }

  static getAllVideos() {
    return http.get('/api/videos/all');
  }

  static getVideo(videoId) {
    return http.get('/api/videos', { videoId });
  }
}
