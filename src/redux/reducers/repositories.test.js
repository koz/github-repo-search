import reducer from './repositories';
import { FETCH_REPOSITORY_START, FETCH_REPOSITORY_SUCCESS, FETCH_REPOSITORY_ERROR } from '../actions/actions';

describe('reducers', () => {
  test('should return de current state in default action types', () => {
    expect(reducer(undefined, { type: '' })).toStrictEqual(new Map());
  });

  test('should return updated state in FETCH_REPOSITORY_START action type', () => {
    expect(reducer(undefined, { type: FETCH_REPOSITORY_START, payload: { fullName: 'key' } })).toStrictEqual(
      new Map([['key', { isLoading: true }]])
    );
  });

  test('should return updated state in FETCH_REPOSITORY_SUCCESS action type', () => {
    const payload = { fullName: 'payload' };
    const initialData = { fullName: 'full/name' };
    expect(
      reducer(new Map([[initialData.fullName, initialData]]), { type: FETCH_REPOSITORY_SUCCESS, payload })
    ).toStrictEqual(
      new Map([
        [initialData.fullName, initialData],
        [
          payload.fullName,
          {
            ...payload,
            isLoading: false,
          },
        ],
      ])
    );

    expect(reducer(undefined, { type: FETCH_REPOSITORY_SUCCESS, payload })).toStrictEqual(
      new Map([
        [
          payload.fullName,
          {
            ...payload,
            isLoading: false,
          },
        ],
      ])
    );
  });

  test('should return updated state as error in FETCH_REPOSITORY_ERROR action type', () => {
    const error = { code: 1, message: 'test' };
    const key = 'key';
    expect(reducer(undefined, { type: FETCH_REPOSITORY_ERROR, payload: { fullName: key, error } })).toStrictEqual(
      new Map([[key, { isLoading: false, error }]])
    );
  });
});
