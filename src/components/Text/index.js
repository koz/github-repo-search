import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes, textStyles } from '../../styles/text';

export default styled.p`
  ${(props) => {
    switch (props.size) {
      case sizes.medium:
        return textStyles[sizes.medium];
      case sizes.large:
        return textStyles[sizes.large];
      case sizes.xlarge:
        return textStyles[sizes.xlarge];
      case sizes.small:
      default:
        return textStyles[sizes.small];
    }
  }}
`;
