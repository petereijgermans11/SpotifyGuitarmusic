import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const SidebarContainer = styled.div`
  width: 230px;
  height: 100%;
  background-color: #000000;
  color: white;
  padding: 20px;
`;

const Logo = styled.div`
  color: #1db954;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease;
  color: #b3b3b3;

  &:hover {
    color: white;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>Spotify Clone</Logo>
      <MenuItem>
        <HomeIcon />
        <span>Home</span>
      </MenuItem>
      <MenuItem>
        <SearchIcon />
        <span>Search</span>
      </MenuItem>
      <MenuItem>
        <LibraryMusicIcon />
        <span>Your Library</span>
      </MenuItem>
    </SidebarContainer>
  );
}

export default Sidebar; 