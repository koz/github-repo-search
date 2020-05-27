import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';

const StyledContainer = styled.div`
  margin: 0 3.2rem;

  ${mediaQueries[breakpoints.medium]} {
    margin: 0 5.4rem;
  }

  ${mediaQueries[breakpoints.large]} {
    margin: 10rem 18rem 0;
  }
`;

const propTypes = {
  route: PropTypes.string,
};

const LoadingPageComponent = ({ route }) => (
  <StyledContainer data-testid={`${route}-route`}>
    <Text>Loading...</Text>
  </StyledContainer>
);

LoadingPageComponent.propTypes = propTypes;

export default LoadingPageComponent;
