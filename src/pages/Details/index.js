import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useRepository } from '../../redux/selectors';
import { getRepository } from '../../redux/thunks/index';
import useRepositoryData from '../../hooks/useRepositoryData';

const Details = () => {
  const { owner, repo } = useParams();
  const data = useRepositoryData(owner, repo);

  return (
    <>
      <Header showBack />
    </>
  );
};

export default Details;
