import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchForm from '../../hooks/useSearchForm';
import Pagination from '../../components/Pagination';
import ResultsList from '../../components/ResultsList';
import ResultsCount from '../../components/ResultsCount';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 3.2rem 3rem;

  ${mediaQueries[breakpoints.medium]} {
    margin: 0 5.4rem 3rem;
  }

  ${mediaQueries[breakpoints.large]} {
    margin: 0 18rem 3rem;
  }
`;

const StyledSearchForm = styled(SearchForm)`
  ${mediaQueries[breakpoints.large]} {
    margin-top: 10.4rem;
  }
`;

const StyledText = styled(Text)`
  margin-top: 4.8rem;

  ${mediaQueries[breakpoints.large]} {
    margin-top: 10.4rem;
  }
`;

const StyledResultsList = styled(ResultsList)`
  list-style: none;
  margin-top: 8rem;
  width: 100%;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 5rem;
`;

const StyledResultsCount = styled(ResultsCount)`
  margin-top: 4.8rem;

  ${mediaQueries[breakpoints.large]} {
    margin-top: 10.4rem;
  }
`;

const Home = () => {
  const {
    handleChange,
    query,
    pagination,
    page,
    resultsCount,
    repositories,
    responseTime,
    isLoading,
    error,
  } = useSearchForm();
  const [inputValue, setInputValue] = useState(query || '');
  const handleChangeFn = (e) => {
    setInputValue(e.target.value);
    handleChange(e);
  };
  const repositoriesSize = repositories?.size || 0;
  const showResults = !isLoading && !error && inputValue && repositories;

  return (
    <StyledContainer>
      <StyledSearchForm data-testid="search-form" value={inputValue} onChange={handleChangeFn} />
      {isLoading && <StyledText data-testid="loading-message">Loading results...</StyledText>}
      {error && <StyledText data-testid="error-message">An error has occurred, try again later.</StyledText>}
      {showResults && (
        <>
          <StyledResultsCount
            data-testid="results-count"
            repositoriesLength={repositoriesSize}
            currentPage={page}
            totalResults={resultsCount}
            responseTime={responseTime}
          />
          <StyledResultsList repositories={repositories} data-testid="repositories-list" />
          {pagination ? <StyledPagination pagination={pagination} currentPage={page} /> : null}
        </>
      )}
    </StyledContainer>
  );
};

export default Home;
