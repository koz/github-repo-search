export const requestHandler = (r) => {
  if (r.ok) {
    return r.json();
  } else {
    throw { code: r.status, message: r.statusText };
  }
};
