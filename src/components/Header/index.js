import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import arrow from '../../assets/icons/arrow.svg';
import { breakpoints, mediaQueries } from '../../styles/mediaQueries';
import { white } from '../../styles/colors';
import { textStyles, sizes } from '../../styles/text';
import useBackButton from '../../hooks/useBackButton';

const StyledContainer = styled.div`
  margin: 3.2rem;

  ${mediaQueries[breakpoints.medium]} {
    margin: 5.4rem;
  }

  ${mediaQueries[breakpoints.large]} {
    margin: 5.4rem 18rem 0;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: ${white};
  ${textStyles[sizes.small]}
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;

  > span {
    margin-left: 1.2rem;
  }
`;

const Header = () => {
  const { state: showBack, handleClick } = useBackButton();
  return (
    <StyledContainer>
      {showBack ? (
        <StyledButton data-testid="back-button" onClick={handleClick}>
          <img src={arrow} alt="" />
          <span>Back</span>
        </StyledButton>
      ) : (
        <Link data-testid="home-link" to="/">
          <img data-testid="logo" src={logo} alt="Go to home page" />
        </Link>
      )}
    </StyledContainer>
  );
};

export default Header;
