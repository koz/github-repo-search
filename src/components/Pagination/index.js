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
};

const Pagination = ({ className, pagination = {}, currentPage }) => (
  <StyledContainer data-testid="pagination" className={className}>
    <StyledLink
      as={!pagination.prev ? 'span' : null}
      to={(location) => getPaginatedUrl(location, pagination.prev)}
      disabled={!pagination.prev}
    >
      <img src={arrowIcon} alt="Icon of arrow pointing left" />
    </StyledLink>
    <StyledCurrentPage>{currentPage}</StyledCurrentPage>
    <StyledLink
      as={!pagination.next ? 'span' : null}
      to={(location) => getPaginatedUrl(location, pagination.next)}
      disabled={!pagination.next}
    >
      <StyledRightArrow disabled={!pagination.next} src={arrowIcon} alt="Icon of arrow pointing right" />
    </StyledLink>
  </StyledContainer>
);

Pagination.propTypes = propTypes;

export default Pagination;
