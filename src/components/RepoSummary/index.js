import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';
import { sizes } from '../../styles/text';
import { blue } from '../../styles/colors';
import { parseData } from './utils';
import starIcon from '../../assets/icons/star.svg';
import { breakpoints, mediaQueries } from '../../styles/mediaQueries';

const StyledContainer = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
  padding-bottom: 3rem;

  ${mediaQueries[breakpoints.large]} {
    padding-bottom: 5rem;
  }
`;

const StyledBottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 2rem;
  margin-top: 2rem;

  ${mediaQueries[breakpoints.small]} {
    grid-template-columns: repeat(3, max-content);
  }
`;

const StyledProperty = styled(Text)`
  opacity: 0.7;
`;

const StyledDescription = styled(Text)`
  opacity: 0.7;
`;

const StyledFullName = styled(Text)`
  margin-top: 1rem;
  color: ${blue};
`;

const StyledStarsContainer = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.7;
`;

const StyledStarIcon = styled.img`
  height: 1.6rem;
  width: 1.6rem;
  padding-bottom: 0.3rem;
`;

const StyledStarLabel = styled(Text)`
  margin-left: 0.7rem;
`;

const StyledUpdated = styled(StyledProperty)`
  ${mediaQueries[breakpoints.small]} {
    grid-column-end: span 2;
  }
`;

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  license: PropTypes.string,
  language: PropTypes.string,
  lastUpdated: PropTypes.string.isRequired,
  stars: PropTypes.number,
  fullName: PropTypes.string,
};

const RepoSummary = ({ title, description, fullName, license, language, lastUpdated, stars = 0 }) => (
  <StyledContainer>
    <Text size={sizes.large}>{title}</Text>
    <StyledDescription>{description}</StyledDescription>
    <StyledFullName>{fullName}</StyledFullName>
    <StyledBottomRow>
      <StyledStarsContainer>
        <StyledStarIcon src={starIcon} alt="Star icon" />
        <StyledStarLabel>{stars}</StyledStarLabel>
      </StyledStarsContainer>
      {language ? <StyledProperty>{language}</StyledProperty> : null}
      {license ? <StyledProperty>{license}</StyledProperty> : null}
      {lastUpdated ? <StyledUpdated>Updated on {parseData(lastUpdated)}</StyledUpdated> : null}
    </StyledBottomRow>
  </StyledContainer>
);

RepoSummary.propTypes = propTypes;

export default RepoSummary;
