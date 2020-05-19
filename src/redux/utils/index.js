export const repoDataMapper = (data = {}) => {
  const {
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
  } = data;

  return {
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
  };
};

export const errorDataMapper = (error) => (error.code || error.message ? error : { message: 'An error occurred.' });
