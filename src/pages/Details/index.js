import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useRepository } from '../../redux/selectors';
import { getRepository } from '../../redux/thunks/index';
import useRepositoryData from '../../hooks/useRepositoryData';
import DetailsProperties from '../../components/DetailsProperties';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import Markdown from '../../components/Markdown';
import OwnerInfo from '../../components/OwnerInfo';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 71rem) auto;
  grid-column-gap: 13rem;

  ${mediaQueries[breakpoints.large]} {
    padding: 10rem 18rem 0;
  }
`;

const StyledMarkdown = styled(Markdown)`
  margin-top: 8rem;
`;

const Details = () => {
  const { owner, repo } = useParams();
  const { repository, readme, owner: ownerData } = useRepositoryData(owner, repo);
  const repoUrl = useMemo(() => `https://www.github.com/${owner}/${repo}`, [owner, repo]);
  if (!repository) {
    return null;
  }

  return (
    <>
      <StyledContainer>
        <div>
          <DetailsProperties
            watchers={repository.watchers}
            stars={repository.stars}
            forks={repository.forks}
            issues={repository.issues}
          />
          {readme && readme.content ? <StyledMarkdown url={repoUrl} content={readme.content} /> : null}
        </div>
        <div>
          {ownerData && (
            <OwnerInfo
              avatar={ownerData.avatar}
              user={ownerData.login}
              name={ownerData.name}
              bio={ownerData.bio}
              company={ownerData.company}
              location={ownerData.location}
              orgs={ownerData.orgs}
              site={ownerData.blog}
            />
          )}
        </div>
      </StyledContainer>
    </>
  );
};

export default Details;
