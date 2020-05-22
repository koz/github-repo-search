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

export const ownerMapper = (data = {}, orgsData = []) => {
  const { avatar_url: avatar, bio, blog, company, location, name, login } = data;
  return {
    avatar,
    bio,
    blog,
    company,
    location,
    name,
    login,
    orgs: orgsData.map(orgsMapper),
  };
};

export const orgsMapper = (data) => {
  const { login: name, avatar_url: avatar } = data;
  return {
    name,
    avatar,
  };
};

export const readmeContentsFilter = (data = []) => data.find((item) => item?.name?.match(/^readme.md$/gi));

export const linkHeaderParser = (header) =>
  header.split(',').reduce((obj, i) => {
    const key = i.match(/rel=\"(.*)\"/)[1];
    if (key) {
      obj[key] = i.match(/\<(.*)\>/)[1];
    }
    return obj;
  }, {});
