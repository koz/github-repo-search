export const getPaginatedUrl = (location, page) => ({
  ...location,
  search: location.search.match(/page/gi)
    ? location.search.replace(/\.*(page=\d+)/, `page=${page}`)
    : location.search.concat(`&page=${page}`),
});
