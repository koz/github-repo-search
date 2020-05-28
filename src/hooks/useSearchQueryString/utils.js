export const pushSearch = (history) => (value) => {
  history.push({
    pathname: '/',
    search: value ? new URLSearchParams({ q: value }).toString() : null,
  });
};
