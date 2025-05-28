import React from 'react';
import { Box, Typography, IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipPrevious, SkipNext, VolumeUp } from '@mui/icons-material';

function Player({ currentTrack, isPlaying, onPlayPause, onPrevious, onNext, onVolumeChange }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '90px',
        backgroundColor: '#282828',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Track Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
        {currentTrack && (
          <>
            <img 
              src={currentTrack.album.images[2]?.url} 
              alt={currentTrack.name}
              style={{ width: 56, height: 56, marginRight: 12 }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {currentTrack.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                {currentTrack.artists[0].name}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Playback Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40%' }}>
        <IconButton onClick={onPrevious} sx={{ color: '#b3b3b3' }}>
          <SkipPrevious />
        </IconButton>
        <IconButton 
          onClick={onPlayPause} 
          sx={{ color: 'white', '&:hover': { transform: 'scale(1.1)' } }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={onNext} sx={{ color: '#b3b3b3' }}>
          <SkipNext />
        </IconButton>
      </Box>

      {/* Volume Control */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
        <VolumeUp sx={{ color: '#b3b3b3', mr: 2 }} />
        <Slider
          size="small"
          defaultValue={70}
          onChange={onVolumeChange}
          sx={{ 
            width: 100,
            color: '#1db954',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default Player; 