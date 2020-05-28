import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useRepositoryData from '../../hooks/useRepositoryData';
import DetailsProperties from '../../components/DetailsProperties';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';
import OwnerInfo from '../../components/OwnerInfo';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Readme from '../../components/Readme';

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

const StyledReadme = styled(Readme)`
  margin-top: 8rem;
`;

const StyledLink = styled(Link)`
  margin-top: 2rem;
  display: inline-block;
`;

const StyledOwner = styled(OwnerInfo)`
  margin-top: 4rem;

  ${breakpoints.large} {
    margin-top: 0;
  }
`;

const Details = () => {
  const { owner, repo } = useParams();
  const { repository, readme, owner: ownerData } = useRepositoryData(owner, repo);
  const repoUrl = `https://www.github.com/${owner}/${repo}`;
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
              {readme && <StyledReadme data-testid="readme" error={readme.error} content={readme.content} />}
              <StyledLink data-testid="github-link" href={repoUrl}>
                Open on GitHub
              </StyledLink>
            </StyledContentContainer>
          </div>
          {ownerData && (
            <StyledOwner
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
        </>
      )}
    </StyledContainer>
  );
};

export default Details;
