import React from 'react';
import { render } from '@testing-library/react';
import Text from './index';
import { sizes } from '../../styles/text';

describe('<Text />', () => {
  test('should render correctly', () => {
    const { container } = render(<Text />);
    expect(container).toBeInTheDocument();
  });

  test('should return different classes based on size prop', () => {
    const { container: smallContainer } = render(<Text size={sizes.small} />);
    const { container: mediumContainer } = render(<Text size={sizes.medium} />);
    const { container: largeContainer } = render(<Text size={sizes.large} />);
    const { container: xlargeContainer } = render(<Text size={sizes.xlarge} />);

    const smallClassList = smallContainer.firstElementChild.classList;
    const mediumClassList = mediumContainer.firstElementChild.classList;
    const largeClassList = largeContainer.firstElementChild.classList;
    const xLargeClassList = xlargeContainer.firstElementChild.classList;

    expect(smallClassList).not.toStrictEqual(mediumClassList);
    expect(smallClassList).not.toStrictEqual(largeClassList);
    expect(smallClassList).not.toStrictEqual(xLargeClassList);

    expect(mediumClassList).not.toStrictEqual(smallClassList);
    expect(mediumClassList).not.toStrictEqual(largeClassList);
    expect(mediumClassList).not.toStrictEqual(xLargeClassList);

    expect(largeClassList).not.toStrictEqual(smallClassList);
    expect(largeClassList).not.toStrictEqual(mediumClassList);
    expect(largeClassList).not.toStrictEqual(xLargeClassList);

    expect(xLargeClassList).not.toStrictEqual(smallClassList);
    expect(xLargeClassList).not.toStrictEqual(mediumClassList);
    expect(xLargeClassList).not.toStrictEqual(largeClassList);
  });
});
