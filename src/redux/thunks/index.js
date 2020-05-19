import { fetchRepositoriesStart, fetchRepositoriesSuccess, fetchRepositoriesError } from '../actions/actionCreators';
import { getRepos } from '../../api';

export const getRepositories = (keyword) => async (dispatch) => {
  await dispatch(fetchRepositoriesStart());
  return getRepos(keyword)
    .then((data) => {
      const repositoriesMap = new Map();
      data.items.forEach(
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
          full_name: fullName,
        }) => {
          repositoriesMap.set(id, {
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
            fullName,
          });
        }
      );
      const parsedData = {
        totalCount: data.total_count,
        items: repositoriesMap,
      };
      dispatch(fetchRepositoriesSuccess(parsedData));
    })
    .catch((error) =>
      dispatch(fetchRepositoriesError(error.code || error.message ? error : { message: 'An error occurred.' }))
    );
};
