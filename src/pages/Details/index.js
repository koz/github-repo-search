import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useRepository } from '../../redux/selectors';
import { getRepository } from '../../redux/thunks/index';
import useRepositoryData from '../../hooks/useRepositoryData';
import DetailsProperties from '../../components/DetailsProperties';
import { mediaQueries, breakpoints } from '../../styles/mediaQueries';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mediaQueries[breakpoints.large]} {
    padding: 10rem 18rem 0;
  }
`;

const Details = () => {
  const { owner, repo } = useParams();
  const data = useRepositoryData(owner, repo);

  if (!data) {
    return null;
  }

  return (
    <>
      <Header showBack />
      <StyledContainer>
        <DetailsProperties watchers={data.watchers} stars={data.stars} forks={data.forks} issues={data.issues} />
      </StyledContainer>
    </>
  );
};

export default Details;
