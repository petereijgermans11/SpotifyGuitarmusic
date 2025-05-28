import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MainView from './components/MainView';
import { spotifyApi } from './services/spotify';

// Add these constants at the top of the file
const CLIENT_ID = "aa8f7326ca5b4e3d82f69335808fa61e";
const CLIENT_SECRET = "a26371964a364db59492d77b9f8e7616";
const REDIRECT_URI = "http://127.0.0.1:3000";

function App() {
  const [token, setToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check for authorization code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      // Exchange code for access token
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      });

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      })
      .then(data => {
        const token = data.access_token;
        window.localStorage.setItem("token", token);
        setToken(token);
        spotifyApi.setAccessToken(token);
        // Clear the URL parameters
        window.history.pushState({}, null, '/');
      })
      .catch(error => {
        console.error('Error getting access token:', error);
        window.localStorage.removeItem("token");
      });
    }

    // Check if there's a token in localStorage
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      spotifyApi.setAccessToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
    window.location.href = '/';
  };

  const handlePlayPause = async () => {
    if (currentTrack) {
      try {
        if (isPlaying) {
          await spotifyApi.pause();
        } else {
          await spotifyApi.play(currentTrack.uri);
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error controlling playback:', error);
        if (error.response?.status === 401) {
          logout(); // Token expired or invalid
        }
      }
    }
  };

  const handleVolumeChange = async (event, newValue) => {
    try {
      await spotifyApi.setVolume(newValue);
    } catch (error) {
      console.error('Error setting volume:', error);
      if (error.response?.status === 401) {
        logout(); // Token expired or invalid
      }
    }
  };

  if (!token) return <Login />;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar onLogout={logout} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box 
          sx={{ 
            flex: 1,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 1))',
            backgroundColor: 'rgb(91, 87, 115)',
            overflowY: 'auto',
          }}
        >
          <MainView 
            onTrackSelect={(track) => {
              setCurrentTrack(track);
              setIsPlaying(true);
            }}
            token={token}
          />
        </Box>
        <Player 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
        />
      </Box>
    </Box>
  );
}

export default App; 