import React from 'react';
import styled from 'styled-components';
import Text from '../Text';
import { sizes } from '../../styles/text';
import jobIcon from '../../assets/icons/job.svg';
import linkIcon from '../../assets/icons/link.svg';
import locationIcon from '../../assets/icons/location.svg';
import { blue } from '../../styles/colors';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
`;

const StyledTitle = styled(Text)`
  margin-top: 2rem;
`;

const StyledBody = styled(Text)`
  opacity: 0.7;
`;

const StyledBio = styled(StyledBody)`
  margin-top: 2rem;
`;

const StyledOrgsHeader = styled(StyledBody)`
  margin-top: 3rem;
`;

const StyledOrgsList = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 1rem;
`;

const StyledOrgListItem = styled.li`
  :not(:first-child) {
    margin-left: 2rem;
  }
`;

const StyledOrgAvatar = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

const StyledIconItem = styled.div`
  display: flex;
  align-items: center;

  > img {
    margin-right: 0.8rem;
  }

  :not(:first-child) {
    margin-top: 1rem;
  }
`;

const StyledProperties = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const StyledLink = styled(Text)`
  color: ${blue};
`;

const OwnerInfo = ({ avatar, user, name, bio, company, location, orgs, site }) => (
  <StyledContainer>
    {avatar && <StyledAvatar data-testid="avatar" src={avatar} />}
    {name && (
      <StyledTitle data-testid="name" as="h2" size={sizes.medium}>
        {name}
      </StyledTitle>
    )}
    {user && <StyledBody data-testid="user">{user}</StyledBody>}
    {bio && <StyledBio data-testid="bio">{bio}</StyledBio>}
    <StyledProperties>
      {company && (
        <StyledIconItem data-testid="company">
          <img src={jobIcon} />
          <Text>{company}</Text>
        </StyledIconItem>
      )}
      {location && (
        <StyledIconItem data-testid="location">
          <img src={locationIcon} />
          <Text>{location}</Text>
        </StyledIconItem>
      )}
      {site && (
        <StyledIconItem data-testid="site">
          <img src={linkIcon} />
          <StyledLink data-testid="site-link" as="a" href={site.match(/^http(s?):\/\//) ? site : `//${site}`}>
            {site}
          </StyledLink>
        </StyledIconItem>
      )}
    </StyledProperties>
    {orgs && orgs.length && (
      <>
        <StyledOrgsHeader data-testid="orgs-title">Organizations</StyledOrgsHeader>
        <StyledOrgsList>
          {orgs.map(({ name, avatar }) => (
            <StyledOrgListItem key={name}>
              <StyledOrgAvatar data-testid="orgs-avatar" alt={name} src={avatar} />
            </StyledOrgListItem>
          ))}
        </StyledOrgsList>
      </>
    )}
  </StyledContainer>
);

export default OwnerInfo;
