import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import { sizes } from '../../styles/text';
import { blue } from '../../styles/colors';
import { parseData } from './utils';
import starIcon from '../../assets/icons/star.svg';

const StyledContainer = styled.div`
  width: 100%;
  padding-bottom: 5rem;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
`;

const StyledBottomRow = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const StyledProperty = styled(Text)`
  :not(:first-child) {
    margin-left: 2rem;
  }
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

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  license: PropTypes.string,
  language: PropTypes.string,
  lastUpdated: PropTypes.string.isRequired,
  stars: PropTypes.number,
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
      {lastUpdated ? <StyledProperty>Updated on {parseData(lastUpdated)}</StyledProperty> : null}
    </StyledBottomRow>
  </StyledContainer>
);

RepoSummary.propTypes = propTypes;

export default RepoSummary;
