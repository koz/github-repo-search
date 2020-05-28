import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowIcon from '../../assets/icons/arrow.svg';
import Text from '../Text';
import { getPaginatedUrl } from './utils';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCurrentPage = styled(Text)`
  opacity: 0.7;
  margin: 0 1.5rem 0.2rem;
`;

const StyledLink = styled(Link)`
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: opacity 300ms ease;
`;

const StyledRightArrow = styled.img`
  transform: rotate(180deg);
`;

const propTypes = {
  className: PropTypes.string,
  pagination: PropTypes.shape({
    prev: PropTypes.string,
    next: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  currentPage: PropTypes.number,
  'data-testid': PropTypes.string,
};

const Pagination = ({ className, pagination = {}, currentPage, 'data-testid': testId }) => {
  const hasPrevPagination = !!pagination.prev;
  const hasNextPagination = !!pagination.next;
  return (
    <StyledContainer data-testid={testId} className={className}>
      <StyledLink
        data-testid="prev-link"
        as={!hasPrevPagination ? 'span' : null}
        to={hasPrevPagination ? (location) => getPaginatedUrl(location, pagination.prev) : null}
        disabled={!hasPrevPagination}
      >
        <img src={arrowIcon} alt="Go to previous page" />
      </StyledLink>
      <StyledCurrentPage aria-current="page" data-testid="current-page">
        {currentPage}
      </StyledCurrentPage>
      <StyledLink
        data-testid="next-link"
        as={!hasNextPagination ? 'span' : null}
        to={hasNextPagination ? (location) => getPaginatedUrl(location, pagination.next) : null}
        disabled={!hasNextPagination}
      >
        <StyledRightArrow src={arrowIcon} alt="Go to next page" />
      </StyledLink>
    </StyledContainer>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;
