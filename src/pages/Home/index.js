import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQueries[breakpoints.large]} {
    padding: 0 18rem;
  }
`;

const StyledSearchForm = styled(SearchForm)`
  ${mediaQueries[breakpoints.large]} {
    margin-top: 10.4rem;
  }
`;

const Home = () => (
  <StyledContainer>
    <StyledSearchForm />
  </StyledContainer>
);

export default Home;
