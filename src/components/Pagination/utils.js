export const getPaginatedUrl = (location, page) => {
  if (!location.search) {
    return {
      ...location,
      search: `?page=${page}`,
    };
  }

  return {
    ...location,
    search: location.search.match(/page/gi)
      ? location.search.replace(/\.*(page=\d+)/, `page=${page}`)
      : location.search.concat(`&page=${page}`),
  };
};
