import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes, textStyles } from '../../styles/text';

export default styled.p`
  ${({ size }) => {
    switch (size) {
      case sizes.medium:
        return textStyles.medium;
      case sizes.large:
        return textStyles.large;
      case sizes.xlarge:
        return textStyles.xlarge;
      case sizes.small:
      default:
        return textStyles.small;
    }
  }}
`;
