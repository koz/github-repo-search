import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import { blue } from '../../styles/colors';

const StyledText = styled(Text)`
  color: ${blue};

  :hover {
    text-decoration: underline;
  }
`;

const propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  target: PropTypes.string,
  'data-testid': PropTypes.string,
};

const Link = ({ href, target, children, className, 'data-testid': testId }) => (
  <StyledText target={target} as="a" className={className} href={href} data-testid={testId}>
    {children}
  </StyledText>
);

Link.propTypes = propTypes;

export default Link;
