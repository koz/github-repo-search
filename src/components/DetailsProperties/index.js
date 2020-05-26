import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import forkIcon from '../../assets/icons/fork.svg';
import issueIcon from '../../assets/icons/issue.svg';
import watchIcon from '../../assets/icons/watch.svg';
import starIcon from '../../assets/icons/star.svg';
import { textStyles, sizes } from '../../styles/text';
import { white } from '../../styles/colors';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledListItem = styled.li`
  ${textStyles[sizes.small]}
  color: ${white};
  display: flex;
  align-items: center;

  :not(:first-child) {
    margin-left: 3.2rem;
  }
`;

const StyledLabel = styled.span`
  opacity: 0.7;
  margin: 0 0.5rem 0 0.7rem;
`;

const propTypes = {
  watchers: PropTypes.number,
  stars: PropTypes.number,
  forks: PropTypes.number,
  issues: PropTypes.number,
};

const DetailsProperties = ({ watchers = 0, stars = 0, forks = 0, issues = 0 }) => (
  <StyledList>
    <StyledListItem data-testid="watchers">
      <img src={watchIcon} alt="Icon of an open eye" />
      <StyledLabel>Watchers</StyledLabel>
      {watchers}
    </StyledListItem>
    <StyledListItem data-testid="stars">
      <img src={starIcon} alt="Icon of star" />
      <StyledLabel>Stars</StyledLabel>
      {stars}
    </StyledListItem>
    <StyledListItem data-testid="forks">
      <img
        src={forkIcon}
        alt="Icon of one path coming from a circle branching in two others that ends on a new circle each"
      />
      <StyledLabel>Forks</StyledLabel>
      {forks}
    </StyledListItem>
    <StyledListItem data-testid="issues">
      <img src={issueIcon} alt="Icon of an exclamation point inside circle draw" />
      <StyledLabel>Issues</StyledLabel>
      {issues}
    </StyledListItem>
  </StyledList>
);

DetailsProperties.propTypes = propTypes;

export default DetailsProperties;
