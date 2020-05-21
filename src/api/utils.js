export const requestHandler = (r) => {
  if (r.ok) {
    return r.json();
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
