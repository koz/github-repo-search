import readmeFiles from './readmeFiles';
import { FETCH_README_START, FETCH_README_SUCCESS, FETCH_README_ERROR } from '../actions/actions';

describe('reducers/readmeFiles', () => {
  test('should return state with loading state for FETCH_README_START', () => {
    const state = readmeFiles(new Map(), { type: FETCH_README_START, payload: { owner: 'owner', repo: 'repo' } });
    expect(state).toStrictEqual(new Map([['owner/repo', { isLoading: true }]]));
  });

  test('should return state with updated data for FETCH_README_SUCCESS', () => {
    const action = {
      type: FETCH_README_SUCCESS,
      payload: { owner: 'owner', repo: 'repo', data: 'content' },
    };
    const state = readmeFiles(new Map(), action);
    expect(state).toStrictEqual(new Map([['owner/repo', { isLoading: false, content: 'content' }]]));

    const stateWithPreviousLoading = readmeFiles(new Map([['owner/repo', { isLoading: true }]]), action);
    expect(state).toStrictEqual(new Map([['owner/repo', { isLoading: false, content: 'content' }]]));
  });

  test('should return state with error for FETCH_README_ERROR', () => {
    const action = {
      type: FETCH_README_ERROR,
      payload: { owner: 'owner', repo: 'repo', error: { message: 'Error' } },
    };
    const state = readmeFiles(new Map(), action);
    expect(state).toStrictEqual(new Map([['owner/repo', { isLoading: false, error: { message: 'Error' } }]]));

    const stateWithPreviousLoading = readmeFiles(new Map([['owner/repo', { isLoading: true }]]), action);
    expect(state).toStrictEqual(new Map([['owner/repo', { isLoading: false, error: { message: 'Error' } }]]));
  });
});
