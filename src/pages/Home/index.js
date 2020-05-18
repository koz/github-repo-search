import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import { getRepositories } from '../../redux/thunks';
import debounce from 'lodash.debounce';
import useSearchForm from '../../hooks/useSearchForm';

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

const Home = () => {
  const { handleChange } = useSearchForm();

  return (
    <StyledContainer>
      <StyledSearchForm onChange={handleChange} />
    </StyledContainer>
  );
};

export default Home;
