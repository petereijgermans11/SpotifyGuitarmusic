import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const SidebarContainer = styled.div`
  width: 230px;
  height: 100vh;
  background-color: #040404;
  color: white;
  padding: 20px;
`;

const Logo = styled.img`
  height: 70px;
  padding: 10px;
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  height: 40px;
  cursor: pointer;
  transition: 200ms color ease-in;

  &:hover {
    color: white;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo src="/spotify-logo.png" alt="Spotify logo" />
      <SidebarOption>
        <HomeIcon className="icon" />
        <h4>Home</h4>
      </SidebarOption>
      <SidebarOption>
        <SearchIcon className="icon" />
        <h4>Search</h4>
      </SidebarOption>
      <SidebarOption>
        <LibraryMusicIcon className="icon" />
        <h4>Your Library</h4>
      </SidebarOption>
    </SidebarContainer>
  );
};

export default Sidebar; 