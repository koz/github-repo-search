export const breakpoints = {
  small: 375,
  medium: 1024,
  large: 1440,
};

export const mediaQueries = {
  [breakpoints.small]: `@media(max-width:${breakpoints.medium - 1}px)`,
  [breakpoints.medium]: `@media(min-width:${breakpoints.medium}px) and (max-width:${breakpoints.large - 1}px)`,
  [breakpoints.large]: `@media(min-width:${breakpoints.large}px)`,
};
