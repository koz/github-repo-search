import styled from 'styled-components';
import { white } from '../../styles/colors';
import { sizes, textStyles } from '../../styles/text';

export default styled.input`
  ${textStyles[sizes.xlarge]}
  border-radius: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: none;
  color: ${white};
  width: 100%;
  ::placeholder {
    opacity: 0.3;
  }
`;
