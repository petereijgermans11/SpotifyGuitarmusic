import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
`;

const LoginButton = styled.a`
  padding: 20px;
  background-color: #1db954;
  border-radius: 99px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  
  &:hover {
    background-color: #1ed760;
  }
`;

const Logo = styled.img`
  width: 70%;
  max-width: 300px;
  margin-bottom: 50px;
`;

function Login() {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <LoginContainer>
      <Logo src="/spotify-logo.png" alt="Spotify logo" />
      <LoginButton href={AUTH_URL}>LOGIN WITH SPOTIFY</LoginButton>
    </LoginContainer>
  );
}

export default Login; 