import { useSelector } from 'react-redux';

export const useTotalCount = () => useSelector((state) => state?.repositories?.totalCount);
export const useRepositories = () => useSelector((state) => state?.repositories?.items);
