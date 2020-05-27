import { breakpoints, mediaQueries } from './mediaQueries';

export const sizes = {
  small: 's',
  medium: 'm',
  large: 'l',
  xlarge: 'xl',
};

export const textStyles = {
  [sizes.small]: `
    font-size: 1.2rem;
    line-height: 1.47;

    ${mediaQueries[breakpoints.large]} {
      font-size: 1.5rem;
    }
  `,
  [sizes.medium]: `
    font-weight: bold;
    line-height: 1.5;
    font-size: 1.6rem;

    ${mediaQueries[breakpoints.large]} {
      font-size: 2rem;
    }
  `,
  [sizes.large]: `
    font-weight: bold;
    font-size: 3.2rem;

    ${mediaQueries[breakpoints.large]} {
      font-size: 4rem;
    }
  `,
  [sizes.xlarge]: `
    font-weight: bold;
    font-size: 4rem;

    ${mediaQueries[breakpoints.large]} {
      font-size: 6rem;
    }
  `,
};
