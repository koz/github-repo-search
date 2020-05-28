import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchResults from '../../hooks/useSearchResults';
import Pagination from '../../components/Pagination';
import ResultsList from '../../components/ResultsList';
import ResultsCount from '../../components/ResultsCount';
import useSearchQueryString from '../../hooks/useSearchQueryString';

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
  const { handleChange, page, query } = useSearchQueryString();
  const { pagination, resultsCount, repositories, responseTime, isLoading, error } = useSearchResults({ page, query });
  const [inputValue, setInputValue] = useState(query || '');
  const handleChangeFn = (e) => {
    setInputValue(e.target.value);
    handleChange(e);
  };
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
            repositoriesLength={repositories.size || 0}
            currentPage={page}
            totalResults={resultsCount}
            responseTime={responseTime}
          />
          <StyledResultsList repositories={repositories} data-testid="repositories-list" />
          {pagination ? <StyledPagination data-testid="pagination" pagination={pagination} currentPage={page} /> : null}
        </>
      )}
    </StyledContainer>
  );
};

export default Home;
