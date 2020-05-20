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
    subscribers_count: watchers,
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

export const errorDataMapper = (error) =>
  error.code || error.message ? { code: error.code, message: error.message } : { message: 'An error occurred.' };

export const ownerMapper = (data = {}) => {
  const { avatar_url: avatar, bio, blog, company, location, name, login } = data;
  return {
    avatar,
    bio,
    blog,
    company,
    location,
    name,
    login,
  };
};
