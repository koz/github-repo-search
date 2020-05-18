import React, { useMemo } from 'react';
import styled from 'styled-components';
import SearchForm from '../../components/SearchForm';
import Text from '../../components/Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import useSearchForm from '../../hooks/useSearchForm';
import { sizes } from '../../styles/text';
import { useSelector } from 'react-redux';
import { useTotalCount } from '../../redux/selectors';

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

const Home = () => {
  const { handleChange } = useSearchForm();
  const results = useTotalCount();
  const formattedResults = useMemo(() => {
    const intl = new Intl.NumberFormat();
    return intl.format(results);
  }, [results]);

  return (
    <StyledContainer>
      <StyledSearchForm data-testid="search-form" onChange={handleChange} />
      {results ? (
        <StyledResultsCount size={sizes.small}>
          {formattedResults} {results === 1 ? 'repository' : 'repositories'} found
        </StyledResultsCount>
      ) : null}
    </StyledContainer>
  );
};

export default Home;
