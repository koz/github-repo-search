import { useSelector } from 'react-redux';

export const useTotalCount = () => useSelector((state) => state?.repositories?.totalCount);
