import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = "aa8f7326ca5b4e3d82f69335808fa61e";
const REDIRECT_URI = "http://127.0.0.1:3000";

export const spotifyApi = {
  token: null,

  setAccessToken(token) {
    this.token = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  },

  async getAccessToken(code) {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  },

  async search(query, types = ['track', 'artist', 'album']) {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
        headers: this.getHeaders(),
        params: {
          q: query,
          type: types.join(','),
          limit: 20
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  async getUserPlaylists() {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/me/playlists`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error getting playlists:', error);
      throw error;
    }
  },

  async getPlaylist(playlistId) {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/playlists/${playlistId}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error getting playlist:', error);
      throw error;
    }
  },

  async play(uri) {
    try {
      // First get available devices
      const devices = await this.getDevices();
      if (!devices.devices.length) {
        throw new Error('No available devices found. Please open Spotify on any device.');
      }

      // Use the first available device
      const deviceId = devices.devices[0].id;

      await axios.put(`${SPOTIFY_BASE_URL}/me/player/play?device_id=${deviceId}`, {
        uris: [uri]
      }, {
        headers: this.getHeaders()
      });
    } catch (error) {
      console.error('Error playing track:', error);
      throw error;
    }
  },

  async pause() {
    try {
      await axios.put(`${SPOTIFY_BASE_URL}/me/player/pause`, {}, {
        headers: this.getHeaders()
      });
    } catch (error) {
      console.error('Error pausing track:', error);
      throw error;
    }
  },

  async getDevices() {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/me/player/devices`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error getting devices:', error);
      throw error;
    }
  },

  async getArtistTopTracks(artistId) {
    try {
      const response = await axios.get(
        `${SPOTIFY_BASE_URL}/artists/${artistId}/top-tracks?market=NL`,
        {
          headers: this.getHeaders()
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting artist top tracks:', error);
      throw error;
    }
  },

  handleError(error) {
    if (error.response?.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = '/';
    }
  }
}; 