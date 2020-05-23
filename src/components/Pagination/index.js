import React from 'react';
import styled from 'styled-components';
import arrowIcon from '../../assets/icons/arrow.svg';
import Text from '../Text';
import { Link, useLocation } from 'react-router-dom';
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

const Pagination = ({ className, pagination = {}, currentPage }) => {
  return (
    <StyledContainer className={className}>
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
};

export default Pagination;
