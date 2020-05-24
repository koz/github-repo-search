import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import MarkdownRender from 'markdown-to-jsx';
import { sizes } from '../../styles/text';
import { blue, white } from '../../styles/colors';
import { Link } from 'react-router-dom';

const StyledContainer = styled(MarkdownRender)`
  width: 100%;
  max-height: 60vh;
  overflow: hidden;
  position: relative;

  ::after {
    content: '';
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 5rem;
  }
`;

const StyledBody = styled.p`
  opacity: 0.7;
  margin-bottom: 3rem;
`;

const StyledH1 = styled(Text)`
  margin-bottom: 3rem;
`;

const StyledHeading = styled(Text)`
  margin-bottom: 3rem;
`;

const StyledHR = styled.hr`
  margin-bottom: 3rem;
  opacity: 0.7;
  border-top: none;
`;

const StyledLink = styled(Text)`
  color: ${blue};
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: ${white};
`;

const propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

const Markdown = ({ className, content, url }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={className}>
      <StyledContainer
        showMore={showMore}
        children={content}
        options={{
          overrides: {
            h1: {
              component: StyledH1,
              props: {
                size: sizes.large,
                as: 'h1',
              },
            },
            h2: {
              component: StyledHeading,
            },
            h3: {
              component: StyledHeading,
            },
            h4: {
              component: StyledHeading,
            },
            h5: {
              component: StyledHeading,
            },
            h6: {
              component: StyledHeading,
            },
            p: {
              component: StyledBody,
            },
            hr: {
              component: StyledHR,
            },
            a: {
              component: StyledLink,
              props: {
                as: 'a',
              },
            },
            img: {
              component: StyledImage,
            },
            li: {
              component: StyledBody,
              as: 'li',
            },
          },
        }}
      />
      <StyledLink as="a" href={url}>
        Open on GitHub
      </StyledLink>
    </div>
  );
};

Markdown.propTypes = propTypes;

export default Markdown;
