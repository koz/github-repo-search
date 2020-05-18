import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { breakpoints, mediaQueries } from '../../styles/mediaQueries';

const StyledContainer = styled.div`
  margin: 3.2rem;

  ${mediaQueries[breakpoints.large]} {
    margin: 5.4rem 18rem 0;
  }
`;

const Header = () => (
  <StyledContainer>
    <Link data-testid="home-link" to="/">
      <img data-testid="logo" src={logo} />
    </Link>
  </StyledContainer>
);

export default Header;
