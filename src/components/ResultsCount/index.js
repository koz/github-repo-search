import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import { formatNumber, millisecondsToSeconds } from './utils';

const propTypes = {
  className: PropTypes.string,
  repositoriesLength: PropTypes.number,
  currentPage: PropTypes.number,
  totalResults: PropTypes.number,
  responseTime: PropTypes.number,
  'data-testid': PropTypes.string,
};

const ResultsCount = ({
  className,
  repositoriesLength,
  currentPage,
  totalResults,
  responseTime,
  'data-testid': testId,
}) => {
  if (totalResults === 0) {
    return <Text data-testid={testId}>No results found for this search :(</Text>;
  }

  const firstPageElement = repositoriesLength * (currentPage - 1) + 1;
  const lastPageElement = repositoriesLength * currentPage;
  const formattedResults = formatNumber(totalResults);
  return (
    <Text data-testid={testId} className={className}>
      Showing {firstPageElement} to {lastPageElement} of {formattedResults}{' '}
      {totalResults === 1 ? 'repository' : 'repositories'} found in {millisecondsToSeconds(responseTime)}s
    </Text>
  );
};

ResultsCount.propTypes = propTypes;

export default ResultsCount;
