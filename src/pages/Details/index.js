import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useRepositoryData from '../../hooks/useRepositoryData';
import DetailsProperties from '../../components/DetailsProperties';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import Markdown from '../../components/Markdown';
import OwnerInfo from '../../components/OwnerInfo';
import Text from '../../components/Text';
import { blue } from '../../styles/colors';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 71rem) auto;
  grid-column-gap: 13rem;

  ${mediaQueries[breakpoints.large]} {
    padding: 10rem 18rem 0;
  }
`;

const StyledContentContainer = styled.div`
  margin-top: 8rem;
`;

const StyledMarkdown = styled(Markdown)`
  margin-top: 8rem;
`;

const StyledLink = styled(Text)`
  margin-top: 2rem;
  color: ${blue};
  display: inline-block;
`;

const Details = () => {
  const { owner, repo } = useParams();
  const { repository, readme, owner: ownerData } = useRepositoryData(owner, repo);
  const repoUrl = useMemo(() => `https://www.github.com/${owner}/${repo}`, [owner, repo]);
  const isLoading = repository?.isLoading || ownerData?.isLoading || readme?.isLoading;

  return (
    <StyledContainer>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
        <>
          <div>
            {repository && (
              <DetailsProperties
                watchers={repository.watchers}
                stars={repository.stars}
                forks={repository.forks}
                issues={repository.issues}
              />
            )}
            <StyledContentContainer>
              {readme?.error && <Text>{readme.error.code === 404 ? readme.error.message : 'An error occurred'}</Text>}
              {readme && !readme?.error && readme?.content ? <StyledMarkdown content={readme.content} /> : null}
              <StyledLink as="a" href={repoUrl}>
                Open on GitHub
              </StyledLink>
            </StyledContentContainer>
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
        </>
      )}
    </StyledContainer>
  );
};

export default Details;
