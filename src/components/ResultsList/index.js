import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RepoSummary from '../RepoSummary';

const StyledResultsList = styled.ul`
  list-style: none;
  width: 100%;
`;

const StyledListItem = styled.li`
  :not(:first-child) {
    margin-top: 5rem;
  }
`;

const propTypes = {
  repositories: PropTypes.instanceOf(Map),
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

const ResultsList = ({ repositories = new Map(), className, 'data-testid': testId }) => (
  <StyledResultsList className={className} data-testid={testId}>
    {Array.from(repositories).map(([id, { name, description, language, updatedAt, license, fullName, stars }]) => (
      <StyledListItem data-testid="repositories-list-item" key={id}>
        <Link to={`/${fullName}`}>
          <RepoSummary
            title={name}
            fullName={fullName}
            description={description}
            language={language}
            lastUpdated={updatedAt}
            license={license?.name}
            stars={stars}
          />
        </Link>
      </StyledListItem>
    ))}
  </StyledResultsList>
);

ResultsList.propTypes = propTypes;

export default ResultsList;
