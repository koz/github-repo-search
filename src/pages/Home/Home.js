import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchForm from '../../hooks/useSearchForm';
import { sizes } from '../../styles/text';
import RepoSummary from '../../components/RepoSummary';
import Pagination from '../../components/Pagination';

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

const StyledResultsList = styled.ul`
  list-style: none;
  margin-top: 8rem;
  width: 100%;
`;

const StyledListItem = styled.li`
  :not(:first-child) {
    margin-top: 5rem;
  }
`;

const StyledPagination = styled(Pagination)`
  margin-top: 5rem;
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
  const formattedResults = useMemo(() => {
    const intl = new Intl.NumberFormat();
    return intl.format(resultsCount);
  }, [resultsCount]);
  const handleChangeFn = (e) => {
    setInputValue(e.target.value);
    handleChange(e);
  };
  const repositoriesSize = repositories?.size || 0;
  const showResults = !isLoading && !error && inputValue && repositories;

  const repositoriesElements = useMemo(() => {
    if (!repositories || !repositoriesSize) {
      return null;
    }
    return Array.from(repositories).map(
      ([id, { name, description, language, updatedAt, license, fullName, stars }]) => (
        <StyledListItem data-testid="repositories-list-item" key={id}>
          <Link to={`/${fullName}`}>
            <RepoSummary
              title={name}
              fullName={fullName}
              description={description}
              language={language}
              lastUpdated={updatedAt}
              license={license?.name}
              stars={stars}
            />
          </Link>
        </StyledListItem>
      )
    );
  }, [repositories]);

  return (
    <StyledContainer>
      <StyledSearchForm data-testid="search-form" value={inputValue} onChange={handleChangeFn} />
      {isLoading && <StyledText data-testid="loading-message">Loading results...</StyledText>}
      {error && <StyledText data-testid="error-message">An error has occurred, try again later.</StyledText>}
      {showResults && (
        <>
          {resultsCount > 0 ? (
            <StyledText size={sizes.small}>
              Showing {repositoriesSize * (page - 1) + 1} to {repositoriesSize * page} of {formattedResults}{' '}
              {resultsCount === 1 ? 'repository' : 'repositories'} found in {responseTime / 1000}s
            </StyledText>
          ) : (
            <StyledText data-testid="no-results-message">No results found for this search :(</StyledText>
          )}
          <StyledResultsList data-testid="repositories-list">{repositoriesElements}</StyledResultsList>
          {pagination ? <StyledPagination pagination={pagination} currentPage={page} /> : null}
        </>
      )}
    </StyledContainer>
  );
};

export default Home;
