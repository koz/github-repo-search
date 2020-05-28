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
};

const ResultsCount = ({ className, repositoriesLength, currentPage, totalResults, responseTime }) => {
  const firstPageElement = repositoriesLength * (currentPage - 1) + 1;
  const lastPageElement = repositoriesLength * currentPage;
  const formattedResults = formatNumber(totalResults);
  return (
    <Text className={className}>
      Showing {firstPageElement} to {lastPageElement} of {formattedResults}{' '}
      {totalResults === 1 ? 'repository' : 'repositories'} found in {millisecondsToSeconds(responseTime)}s
    </Text>
  );
};

ResultsCount.propTypes = propTypes;

export default ResultsCount;