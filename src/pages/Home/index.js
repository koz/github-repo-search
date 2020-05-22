import React, { useMemo } from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchForm from '../../hooks/useSearchForm';
import { sizes } from '../../styles/text';
import { useSelector } from 'react-redux';
import { useTotalCount, useRepositories } from '../../redux/selectors';
import RepoSummary from '../../components/RepoSummary';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const Home = () => {
  const { handleChange, value } = useSearchForm();
  const results = useTotalCount();
  const repositories = useRepositories();
  const formattedResults = useMemo(() => {
    const intl = new Intl.NumberFormat();
    return intl.format(results);
  }, [results]);
  const repositoriesElements = useMemo(() => {
    if (!repositories || !repositories.size) {
      return null;
    } else {
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
    }
  }, [repositories]);

  return (
    <>
      <Header data-testid="header" />
      <StyledContainer>
        <StyledSearchForm data-testid="search-form" value={value} onChange={handleChange} />
        {results ? (
          <StyledResultsCount size={sizes.small}>
            {formattedResults} {results === 1 ? 'repository' : 'repositories'} found
          </StyledResultsCount>
        ) : null}
        {repositoriesElements ? (
          <StyledResultsList data-testid="repositories-list">{repositoriesElements}</StyledResultsList>
        ) : null}
      </StyledContainer>
    </>
  );
};

export default Home;
