import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function Login() {
  const CLIENT_ID = "aa8f7326ca5b4e3d82f69335808fa61e";
  const REDIRECT_URI = "http://127.0.0.1:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";
  const SCOPE = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-read-recently-played"
  ].join(" ");

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=true`;

  console.log('Login URL:', loginUrl);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black',
        gap: '2rem',
      }}
    >
      <Typography variant="h2" sx={{ color: '#1db954' }}>
        Spotify Clone
      </Typography>
      <Button
        href={loginUrl}
        variant="contained"
        sx={{
          backgroundColor: '#1db954',
          padding: '1rem 5rem',
          borderRadius: '5rem',
          '&:hover': {
            backgroundColor: '#1ed760',
          },
        }}
      >
        Login with Spotify
      </Button>
    </Box>
  );
}

export default Login; 