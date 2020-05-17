const API_URL = 'https://api.github.com';

export const getRepos = (keyword) =>
  fetch(`${API_URL}/search/repositories?q=${encodeURIComponent(keyword)}`).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw { code: r.status, message: r.statusText };
    }
  });
