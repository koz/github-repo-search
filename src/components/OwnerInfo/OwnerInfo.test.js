import React from 'react';
import { render } from '@testing-library/react';
import OwnerInfo from '.';

describe('<OwnerInfo />', () => {
  test('should render correctly', () => {
    const { container } = render(<OwnerInfo />);
    expect(container).toBeInTheDocument();
  });

  test('should accept external className', () => {
    const { container } = render(<OwnerInfo className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should render avatar prop as img source', () => {
    const avatar = 'http://avatar/address';
    const { queryByTestId } = render(<OwnerInfo avatar={avatar} />);
    const element = queryByTestId('avatar');
    expect(element).toBeInTheDocument();
    expect(element).toHaveProperty('src', avatar);
  });

  test('should render name info prop', () => {
    const name = 'JohnDoe';
    const { queryByTestId } = render(<OwnerInfo name={name} />);
    const element = queryByTestId('name');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(name);
  });

  test('should render user info prop', () => {
    const user = 'JohnDoe';
    const { queryByTestId } = render(<OwnerInfo user={user} />);
    const element = queryByTestId('user');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(user);
  });

  test('should render bio info prop', () => {
    const bio = 'Test bio';
    const { queryByTestId } = render(<OwnerInfo bio={bio} />);
    const element = queryByTestId('bio');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(bio);
  });

  test('should render company info prop', () => {
    const company = 'Test company';
    const { queryByTestId } = render(<OwnerInfo company={company} />);
    const element = queryByTestId('company');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(company);
  });

  test('should render location info prop', () => {
    const location = 'Test location';
    const { queryByTestId } = render(<OwnerInfo location={location} />);
    const element = queryByTestId('location');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(location);
  });

  test('should render site prop without http correctly', () => {
    const site = 'site.com';
    const { queryByTestId } = render(<OwnerInfo site={site} />);
    const element = queryByTestId('site');
    expect(element).toBeInTheDocument();
    expect(queryByTestId('site-link')).toHaveProperty('href', `http://${site}/`);
    expect(element).toHaveTextContent(site);
  });

  test('should render site prop with http correctly', () => {
    const site = 'http://site.com';
    const { queryByTestId } = render(<OwnerInfo site={site} />);
    const element = queryByTestId('site');
    expect(element).toBeInTheDocument();
    expect(queryByTestId('site-link')).toHaveProperty('href', `${site}/`);
    expect(element).toHaveTextContent(site);
  });

  test('should render site prop with https correctly', () => {
    const site = 'https://site.com';
    const { queryByTestId } = render(<OwnerInfo site={site} />);
    const element = queryByTestId('site');
    expect(element).toBeInTheDocument();
    expect(queryByTestId('site-link')).toHaveProperty('href', `${site}/`);
    expect(element).toHaveTextContent(site);
  });

  test('should render orgs info prop', () => {
    const orgs = [
      { name: 'test org 1', avatar: 'http://testorg1/avatar' },
      { name: 'test org 2', avatar: 'http://testorg2/avatar' },
    ];
    const { queryByTestId, queryAllByTestId } = render(<OwnerInfo orgs={orgs} />);
    expect(queryByTestId('orgs-title')).toBeInTheDocument();
    expect(queryAllByTestId('orgs-avatar')).toHaveLength(orgs.length);
    queryAllByTestId('orgs-avatar').forEach((avatar, i) => expect(avatar).toHaveProperty('src', orgs[i].avatar));
  });

  test('should not break in case of missing information', () => {
    const { container } = render(<OwnerInfo />);
    expect(container).toBeInTheDocument();
  });
});
