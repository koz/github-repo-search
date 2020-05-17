import { fetchRepositoriesStart, fetchRepositoriesSuccess, fetchRepositoriesError } from '../actions/actionCreators';
import { getRepos } from '../../api';

export const getRepositories = (keyword) => async (dispatch) => {
  await dispatch(fetchRepositoriesStart());
  return getRepos(keyword)
    .then((data) => {
      const parsedData = {
        totalCount: data.total_count,
        items: data.items.map(
          ({
            id,
            created_at: createdAt,
            updated_at: updatedAt,
            description,
            forks_count: forks,
            language,
            license,
            name,
            open_issues_count: issues,
            stargazers_count: stars,
            watchers_count: watchers,
          }) => ({
            id,
            createdAt,
            updatedAt,
            description,
            forks,
            language,
            license: license
              ? {
                  name: license.name,
                  url: license.url,
                }
              : null,
            name,
            issues,
            stars,
            watchers,
          })
        ),
      };
      dispatch(fetchRepositoriesSuccess(parsedData));
    })
    .catch((error) => {
      if (error.code || error.message) {
        dispatch(fetchRepositoriesError(error));
      } else {
        throw error;
      }
    });
};
