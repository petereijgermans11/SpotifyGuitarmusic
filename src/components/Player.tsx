import React from 'react';
import styled from 'styled-components';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #282828;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Player = () => {
  return (
    <PlayerContainer>
      <div className="player__left">
        {/* Song details */}
      </div>
      <div className="player__center">
        <ShuffleIcon className="shuffle" />
        <SkipPreviousIcon className="icon" />
        <PlayCircleOutlineIcon fontSize="large" className="icon" />
        <SkipNextIcon className="icon" />
        <RepeatIcon className="repeat" />
      </div>
      <div className="player__right">
        {/* Volume controls */}
      </div>
    </PlayerContainer>
  );
};

export default Player; 