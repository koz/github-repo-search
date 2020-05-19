import React from 'react';
import RepoSummary from './index';
import { render } from '@testing-library/react';
import * as utils from './utils';

describe('<RepoSummary />', () => {
  test('should render correctly', () => {
    const { container } = render(
      <RepoSummary title="" language="" lastUpdated="" license="" description="" fullName="" />
    );
    expect(container).toBeDefined();
  });

  test('should render the correct content', () => {
    const title = 'Title';
    const description = 'Component description';
    const lastUpdated = new Date().toISOString();
    const fullName = 'full/Name';
    const license = 'MIT';
    const language = 'Javascript';
    const stars = 999999;

    const { queryByText } = render(
      <RepoSummary
        title={title}
        language={language}
        lastUpdated={lastUpdated}
        license={license}
        description={description}
        fullName={fullName}
        stars={stars}
      />
    );

    expect(queryByText(title)).toBeDefined();
    expect(queryByText(description)).toBeDefined();
    expect(queryByText(fullName)).toBeDefined();
    expect(queryByText(license)).toBeDefined();
    expect(queryByText(language)).toBeDefined();
    expect(queryByText(String(stars))).toBeDefined();
  });

  test('should render lastUpdated info formatted', () => {
    const lastUpdated = new Date('2020-05-19T13:17:38.067Z').toISOString();

    const { queryByText } = render(
      <RepoSummary title="" language="" lastUpdated={lastUpdated} license="" description="" fullName="" />
    );

    expect(queryByText('Updated on May 19, 2020')).toBeDefined();
  });
});
