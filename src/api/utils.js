export const requestHandler = async (r) => {
  if (r.ok) {
    return {
      data: await r.json(),
      headers: r.headers,
    };
  } else {
    throw { code: r.status, message: r.statusText };
  }
};

export const fileRequestHandler = (r) => {
  if (r.ok) {
    return r.text();
  } else {
    throw { code: r.status, message: r.statusText };
  }
};

export const getQueryString = (queries = {}) =>
  Object.keys(queries).reduce((str, key) => {
    const value = queries[key];
    if (!value) {
      return str;
    }
    const query = `${key}=${value}`;

    return !str.length ? query : str.concat(`&${query}`);
  }, '');
