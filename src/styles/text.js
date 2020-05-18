export const sizes = {
  small: 's',
  medium: 'm',
  large: 'l',
  xlarge: 'xl',
};

export const textStyles = {
  [sizes.small]: `
    font-size: 1.5rem
    line-height: 1.47;
  `,
  [sizes.medium]: `
    font-size: 2rem;
    line-height: 1.5;
    font-weight: bold;
  `,
  [sizes.large]: `
    font-size: 4rem;
    font-weight: bold;
  `,
  [sizes.xlarge]: `
    font-size: 6rem;
    font-weight: bold;
  `,
};
