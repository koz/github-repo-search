import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSearchForm = styled(SearchForm)`
  margin-top: 20vh;
`;

const Home = () => (
  <StyledContainer>
    <StyledSearchForm />
  </StyledContainer>
);

export default Home;
