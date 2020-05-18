import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const sizes = {
  small: 's',
  medium: 'm',
  large: 'l',
  xlarge: 'xl',
};

export default styled.p`
  ${({ size }) => {
    switch (size) {
      case sizes.medium:
        return `
          font-size: 2rem;
          line-height: 1.5;
          font-weight: bold;
        `;
      case sizes.large:
        return `
          font-size: 4rem;
          font-weight: bold;
        `;
      case sizes.xlarge:
        return `
          font-size: 6rem;
          font-weight: bold;
        `;
      case sizes.small:
      default:
        return `
          font-size: 1.5rem
          line-height: 1.47;
        `;
    }
  }}
`;
