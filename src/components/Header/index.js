import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

const StyledContainer = styled.div`
  padding: 3.2rem;
`;

const Header = () => (
  <StyledContainer>
    <Link data-testid="home-link" to="/">
      <img data-testid="logo" src={logo} />
    </Link>
  </StyledContainer>
);

export default Header;
