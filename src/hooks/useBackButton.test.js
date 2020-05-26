import { createMemoryHistory } from 'history';
import { act } from '@testing-library/react';
import renderHook from '../../spec/utils/renderHook';
import useBackButton from './useBackButton';

describe('useBackButton', () => {
  test('should return a handleClick function', () => {
    expect(typeof renderHook({ hook: useBackButton }).handleClick).toEqual('function');
  });

  test("should return false state if it's Homepage ", () => {
    const history = createMemoryHistory();
    history.push('/');
    const { state } = renderHook({ hook: useBackButton, history });
    expect(state).toEqual(false);
  });

  test("should return false state if it's initialPage ", () => {
    const history = createMemoryHistory();
    history.push('/test');
    const { state } = renderHook({ hook: useBackButton, history });
    expect(state).toEqual(false);
  });

  test("should return false true if it's not homepage or initial page ", async () => {
    const history = createMemoryHistory();
    history.push('/');
    const { state } = renderHook({ hook: useBackButton, history });
    await act(async () => {
      history.push('/test');
    });
    /* setTimeout needed to get hook updated value */
    setTimeout(() => {
      expect(state).toEqual(true);
    }, 1000);
  });

  test('should call history goBack in handleClick call ', async () => {
    const history = createMemoryHistory();
    const mockBack = jest.fn();
    history.goBack = mockBack;
    const { handleClick } = renderHook({ hook: useBackButton, history });
    handleClick();
    expect(mockBack).toBeCalledTimes(1);
  });
});
