import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchForm from './index';

describe('<SearchForm />', () => {
  test('should apply external classname', () => {
    const className = 'test-class';
    const { container } = render(<SearchForm className={className} />);
    expect(container.firstChild).toHaveClass(className);
  });

  test('should call onChange on input change event', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<SearchForm onChange={onChangeMock} />);
    fireEvent.change(getByTestId('search-input'), { target: { value: '1' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should call onSubmit on form submit event', () => {
    const onSubmitMock = jest.fn();
    const { getByTestId } = render(<SearchForm onSubmit={onSubmitMock} />);
    fireEvent.submit(getByTestId('search-form'));
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('should render value on input element', () => {
    const value = 'value';
    const { getByTestId } = render(<SearchForm value={value} />);
    expect(getByTestId('search-input').value).toEqual(value);
  });
});
