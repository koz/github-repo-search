/* Custom error class to keep stack trace from Error and also to have status code */
export class RequestError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const requestHandler = async (r) => {
  const data = await r.json();
  if (r.ok) {
    return {
      data,
      headers: r.headers,
    };
  }

  const { message } = data;
  throw new RequestError(message || r.statusText, r.status);
};

export const fileRequestHandler = (r) => {
  if (r.ok) {
    return r.text();
  }
  throw new RequestError(r.statusText, r.status);
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
