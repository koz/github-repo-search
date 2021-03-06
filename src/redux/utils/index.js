export const repoDataMapper = (data) => {
  if (!data) {
    return {};
  }

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
  error && (error.code || error.message)
    ? { code: error.code, message: error.message }
    : { message: 'An error occurred.' };

export const orgsMapper = (data) => {
  if (!data) {
    return {};
  }
  const { login: name, avatar_url: avatar } = data;
  return {
    name,
    avatar,
  };
};

export const ownerMapper = (data, orgsData = []) => {
  if (!data) {
    return {};
  }

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

export const readmeContentsFilter = (data = []) => data.find((item) => item?.name?.match(/^readme.md$/gi));

export const linkHeaderParser = (header) =>
  header
    ? header.split(',').reduce((obj, i) => {
        const newObj = { ...obj };
        const rel = i.match(/rel="(.*)"/);
        const key = rel && rel[1];
        if (key) {
          const value = i.match(/<.*page=(\d+)>/)[1];
          newObj[key] = value;
        }
        return newObj;
      }, {})
    : null;
