import React from 'react';
import Details from './Details';
import renderWithContext from '../../../spec/utils/renderWithContext';
import * as hook from '../../hooks/useRepositoryData';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ owner: 'owner', repo: 'repo' }),
}));

describe('<Describe />', () => {
  test('should render correctly', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repository: {}, readme: {}, owner: {} });
    const { container } = renderWithContext(<Details />);
    expect(container).toBeInTheDocument();
  });

  test('should render correctly', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repository: {}, readme: {}, owner: {} });
    const { container } = renderWithContext(<Details />);
    expect(container).toBeInTheDocument();
  });

  test('should render details properties correctly', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: {
        watchers: 1,
        stars: 12,
        forks: 123,
        issues: 1234,
      },
      readme: {},
      owner: {},
    });
    const { queryByText } = renderWithContext(<Details />);
    expect(queryByText('1')).toBeInTheDocument();
    expect(queryByText('12')).toBeInTheDocument();
    expect(queryByText('123')).toBeInTheDocument();
    expect(queryByText('1234')).toBeInTheDocument();
  });

  test('should render readme error message', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: {},
      readme: {
        error: { code: 404, message: 'Error message test' },
      },
      owner: {},
    });
    const { queryByText } = renderWithContext(<Details />);
    expect(queryByText('Error message test')).toBeInTheDocument();
  });

  test('should render readme generic error message', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: {},
      readme: {
        error: { code: 999, message: 'Error message test' },
      },
      owner: {},
    });
    const { queryByText } = renderWithContext(<Details />);
    expect(queryByText('An error occurred')).toBeInTheDocument();
  });

  test('should render markdown render component', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: {},
      readme: {
        content: 'Content',
      },
      owner: {},
    });
    const { queryByTestId } = renderWithContext(<Details />);
    expect(queryByTestId('markdown-render')).toBeInTheDocument();
  });

  test('should render github repo link', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: {},
    });
    const { queryByTestId } = renderWithContext(<Details />);
    const link = queryByTestId('github-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.github.com/owner/repo');
  });

  test('should render owner info component', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      owner: {},
    });
    const { queryByTestId } = renderWithContext(<Details />);
    expect(queryByTestId('owner-info')).toBeInTheDocument();
  });

  test('should render loading message if repository is loading', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      repository: { isLoading: true },
    });
    const { queryByTestId } = renderWithContext(<Details />);
    expect(queryByTestId('loading-message')).toBeInTheDocument();
  });

  test('should render loading message if owner is loading', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      owner: { isLoading: true },
    });
    const { queryByTestId } = renderWithContext(<Details />);
    expect(queryByTestId('loading-message')).toBeInTheDocument();
  });

  test('should render loading message if readme is loading', () => {
    jest.spyOn(hook, 'default').mockReturnValue({
      readme: { isLoading: true },
    });
    const { queryByTestId } = renderWithContext(<Details />);
    expect(queryByTestId('loading-message')).toBeInTheDocument();
  });
});
