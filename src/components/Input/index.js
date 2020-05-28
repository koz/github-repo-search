import styled from 'styled-components';
import { white } from '../../styles/colors';
import { sizes, textStyles } from '../../styles/text';

export default styled.input`
  ${textStyles[sizes.xlarge]}
  background: none;
  color: ${white};
  width: 100%;
  outline: none;
  padding-bottom: 2rem;
  border: none;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);

  :focus {
    border-bottom: 0.1rem solid rgba(255, 255, 255, 1);
  }
  ::placeholder {
    opacity: 0.3;
  }
`;
