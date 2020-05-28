import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useRepositoryData from '../../hooks/useRepositoryData';
import DetailsProperties from '../../components/DetailsProperties';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import Markdown from '../../components/Markdown';
import OwnerInfo from '../../components/OwnerInfo';
import Text from '../../components/Text';
import Link from '../../components/Link';

const StyledContainer = styled.div`
  margin: 0 3.2rem 3rem;
  display: flex;
  flex-direction: column;

  ${mediaQueries[breakpoints.medium]} {
    margin: 0 5.4rem 3rem;
  }

  ${mediaQueries[breakpoints.large]} {
    margin: 10rem 18rem 0;
    display: grid;
    grid-template-columns: minmax(auto, 71rem) auto;
    grid-column-gap: 13rem;
  }
`;

const StyledContentContainer = styled.div`
  margin-top: 8rem;
`;

const StyledMarkdown = styled(Markdown)`
  margin-top: 8rem;
`;

const StyledLink = styled(Link)`
  margin-top: 2rem;
  display: inline-block;
`;

const OwnerContainer = styled.div`
  margin-top: 4rem;

  ${breakpoints.large} {
    margin-top: 0;
  }
`;

const Details = () => {
  const { owner, repo } = useParams();
  const { repository, readme, owner: ownerData } = useRepositoryData(owner, repo);
  const repoUrl = useMemo(() => `https://www.github.com/${owner}/${repo}`, [owner, repo]);
  const isLoading = repository?.isLoading || ownerData?.isLoading || readme?.isLoading;

  return (
    <StyledContainer>
      {isLoading && <Text data-testid="loading-message">Loading...</Text>}
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
              {readme && (
                <>
                  {readme.error && (
                    <Text>
                      {readme?.error && readme?.error?.code === 404 ? readme.error.message : 'An error occurred'}
                    </Text>
                  )}
                  {readme.content && !readme.error && <StyledMarkdown content={readme.content} />}
                </>
              )}
              <StyledLink data-testid="github-link" href={repoUrl}>
                Open on GitHub
              </StyledLink>
            </StyledContentContainer>
          </div>
          <OwnerContainer>
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
          </OwnerContainer>
        </>
      )}
    </StyledContainer>
  );
};

export default Details;
