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

  test("should not break on input change if there's no onChange prop", () => {
    const { container, getByTestId } = render(<SearchForm />);
    fireEvent.change(getByTestId('search-input'), { target: { value: '1' } });
    expect(container).toBeInTheDocument();
  });

  test('should call onSubmit and preventDefault on form submit event', () => {
    const onSubmitMock = jest.fn();
    const preventDefaultMock = jest.fn();
    const { getByTestId } = render(<SearchForm onSubmit={onSubmitMock} />);
    const submitEvent = new Event('submit');
    Object.assign(submitEvent, { preventDefault: preventDefaultMock });
    fireEvent(getByTestId('search-form'), submitEvent);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(preventDefaultMock).toHaveBeenCalledTimes(1);
  });

  test("should not break on submit event if there's no onSubmit prop", () => {
    const { container, getByTestId } = render(<SearchForm />);
    fireEvent.submit(getByTestId('search-form'));
    expect(container).toBeInTheDocument();
  });

  test('should render value on input element', () => {
    const value = 'value';
    const { getByTestId } = render(<SearchForm value={value} />);
    expect(getByTestId('search-input').value).toEqual(value);
  });
});
