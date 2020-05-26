import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchForm from '../../hooks/useSearchForm';
import { sizes } from '../../styles/text';
import { useTotalCount, useRepositories, useSearchResponseTime, useSearchLoading } from '../../redux/selectors';
import RepoSummary from '../../components/RepoSummary';
import Pagination from '../../components/Pagination';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mediaQueries[breakpoints.large]} {
    padding: 0 18rem 3rem;
  }
`;

const StyledSearchForm = styled(SearchForm)`
  ${mediaQueries[breakpoints.large]} {
    margin-top: 10.4rem;
  }
`;

const StyledResultsCount = styled(Text)`
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

const StyledLoadingText = styled(Text)`
  margin-top: 10.4rem;
`;

const Home = () => {
  const { handleChange, value, pagination, page } = useSearchForm();
  const [inputValue, setInputValue] = useState(value || '');
  const results = useTotalCount();
  const repositories = useRepositories(page);
  const responseTime = useSearchResponseTime();
  const isLoading = useSearchLoading();
  const formattedResults = useMemo(() => {
    const intl = new Intl.NumberFormat();
    return intl.format(results);
  }, [results]);
  const handleChangeFn = (e) => {
    setInputValue(e.target.value);
    handleChange(e);
  };

  const repositoriesElements = useMemo(() => {
    if (!repositories || !repositories.size) {
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
      {isLoading ? (
        <StyledLoadingText>Loading results...</StyledLoadingText>
      ) : (
        <>
          {repositories && results ? (
            <StyledResultsCount size={sizes.small}>
              Showing {repositories.size * (page - 1) + 1} to {repositories.size * page} of {formattedResults}{' '}
              {results === 1 ? 'repository' : 'repositories'} found in {responseTime / 1000}s
            </StyledResultsCount>
          ) : null}
          {repositoriesElements ? (
            <StyledResultsList data-testid="repositories-list">{repositoriesElements}</StyledResultsList>
          ) : null}
          {pagination ? <StyledPagination pagination={pagination} currentPage={page} /> : null}
        </>
      )}
    </StyledContainer>
  );
};

export default Home;
