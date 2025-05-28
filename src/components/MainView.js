import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Card, CardContent, CardMedia, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { spotifyApi } from '../services/spotify';

function MainView({ onTrackSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchType, setSearchType] = useState('artist');

  useEffect(() => {
    loadPlaylists();
    // Initial search for guitar players
    handleSearch(null, 'Al Di Meola');
  }, []);

  const loadPlaylists = async () => {
    try {
      const data = await spotifyApi.getUserPlaylists();
      setPlaylists(data.items);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const loadPlaylistTracks = async (playlistId) => {
    try {
      const response = await spotifyApi.getPlaylist(playlistId);
      setPlaylistTracks(response.tracks.items.map(item => item.track));
    } catch (error) {
      console.error('Error loading playlist tracks:', error);
    }
  };

  const handleSearch = async (e, initialQuery = '') => {
    if (e) e.preventDefault();
    const queryToUse = initialQuery || searchQuery;
    
    try {
      let data;
      if (searchType === 'artist') {
        // Search for the artist first
        data = await spotifyApi.search(queryToUse, ['artist']);
        if (data.artists.items.length > 0) {
          // Get top tracks of the first artist found
          const artistId = data.artists.items[0].id;
          const topTracks = await spotifyApi.getArtistTopTracks(artistId);
          setSearchResults(topTracks.tracks);
        }
      } else {
        // Regular track search
        data = await spotifyApi.search(queryToUse, ['track']);
        setSearchResults(data.tracks.items);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handlePlay = async (track) => {
    try {
      if (currentTrack?.id === track.id && isPlaying) {
        await spotifyApi.pause();
        setIsPlaying(false);
      } else {
        await spotifyApi.play(track.uri);
        setCurrentTrack(track);
        setIsPlaying(true);
        onTrackSelect(track);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      alert('Please make sure you have an active Spotify device open (like Spotify desktop app) and a Premium account');
    }
  };

  const handlePlaylistClick = async (playlist) => {
    await loadPlaylistTracks(playlist.id);
  };

  // Quick search buttons for famous guitarists
  const guitarists = [
    'Al Di Meola',
    'Scott Henderson',
    'Pat Metheny',
    'John McLaughlin',
    'Allan Holdsworth',
    'Joe Satriani',
    'Lee Ritenour',
    'Steve Vai',
    'John Petrucci',
    'Steve Morse',
    'Yngwie Malmsteen',
    'Steve Lukather',
    'Steve Morse',
    'Andy Timmons',
    'Mike Stern',
  ];

  return (
    <Box sx={{ padding: '2rem', color: 'white' }}>
      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: '2rem' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'white' }}>Search Type</InputLabel>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            >
              <MenuItem value="artist">Artist</MenuItem>
              <MenuItem value="track">Track</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for guitarists or tracks"
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
        </Box>
      </form>

      {/* Quick Search Buttons */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
          Famous Guitarists
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {guitarists.map((guitarist) => (
            <Button
              key={guitarist}
              variant="outlined"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { 
                  borderColor: '#1db954',
                  color: '#1db954'
                }
              }}
              onClick={() => {
                setSearchQuery(guitarist);
                handleSearch(null, guitarist);
              }}
            >
              {guitarist}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {searchResults.map((track) => (
              <Grid item xs={12} sm={6} md={4} key={track.id}>
                <Card sx={{ display: 'flex', bgcolor: 'rgba(0, 0, 0, 0.5)' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={track.album.images[0]?.url}
                    alt={track.name}
                  />
                  <CardContent sx={{ flex: '1', color: 'white' }}>
                    <Typography variant="subtitle1">{track.name}</Typography>
                    <Typography variant="body2">{track.artists[0].name}</Typography>
                    <IconButton
                      onClick={() => handlePlay(track)}
                      sx={{ color: 'white' }}
                    >
                      {currentTrack?.id === track.id && isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Playlist Tracks */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          Tracks
        </Typography>
        <Grid container spacing={2}>
          {playlistTracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} key={track.id}>
              <Card sx={{ display: 'flex', bgcolor: 'rgba(0, 0, 0, 0.5)' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={track.album.images[0]?.url}
                  alt={track.name}
                />
                <CardContent sx={{ flex: '1', color: 'white' }}>
                  <Typography variant="subtitle1">{track.name}</Typography>
                  <Typography variant="body2">{track.artists[0].name}</Typography>
                  <IconButton
                    onClick={() => handlePlay(track)}
                    sx={{ color: 'white' }}
                  >
                    {currentTrack?.id === track.id && isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Playlists */}
      <Box>
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          Your Playlists
        </Typography>
        <Grid container spacing={2}>
          {playlists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} key={playlist.id}>
              <Card 
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
                onClick={() => handlePlaylistClick(playlist)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={playlist.images[0]?.url}
                  alt={playlist.name}
                />
                <CardContent sx={{ color: 'white' }}>
                  <Typography variant="subtitle1">{playlist.name}</Typography>
                  <Typography variant="body2">{playlist.tracks.total} tracks</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MainView; 