import { repoDataMapper, errorDataMapper } from '.';

describe('redux/utils', () => {
  describe('repoDataMapper', () => {
    test('should return correctly', () => {
      const data = {
        id: 1,
        name: 'Test',
        description: 'Description',
        created_at: '2020-05-17',
        updated_at: '2020-05-17',
        stargazers_count: 2,
        subscribers_count: 3,
        language: 'Javascript',
        forks_count: 4,
        open_issues_count: 5,
        license: {
          name: 'MIT License',
          url: 'https://api.github.com/licenses/mit',
        },
        full_name: 'full/name',
      };

      expect(repoDataMapper(data)).toMatchObject({
        id: 1,
        name: 'Test',
        description: 'Description',
        createdAt: '2020-05-17',
        updatedAt: '2020-05-17',
        stars: 2,
        watchers: 3,
        language: 'Javascript',
        forks: 4,
        issues: 5,
        license: {
          name: 'MIT License',
          url: 'https://api.github.com/licenses/mit',
        },
        fullName: 'full/name',
      });
    });

    test('should return correctly without license data', () => {
      const data = {
        id: 1,
        name: 'Test',
        description: 'Description',
        created_at: '2020-05-17',
        updated_at: '2020-05-17',
        stargazers_count: 2,
        subscribers_count: 3,
        language: 'Javascript',
        forks_count: 4,
        open_issues_count: 5,
        full_name: 'full/name',
      };

      expect(repoDataMapper(data)).toMatchObject({
        id: 1,
        name: 'Test',
        description: 'Description',
        createdAt: '2020-05-17',
        updatedAt: '2020-05-17',
        stars: 2,
        watchers: 3,
        language: 'Javascript',
        forks: 4,
        issues: 5,
        license: null,
        fullName: 'full/name',
      });
    });
  });

  describe('errorDataMapper', () => {
    test('should return the error if theres message or code', () => {
      const errorWithMessage = { message: 'error' };
      const errorWithCode = { code: 123 };
      expect(errorDataMapper(errorWithMessage)).toMatchObject(errorWithMessage);
      expect(errorDataMapper(errorWithCode)).toMatchObject(errorWithCode);
      expect(errorDataMapper({ ...errorWithCode, ...errorWithMessage })).toMatchObject({
        ...errorWithCode,
        ...errorWithMessage,
      });
    });

    test('should return a generic error', () => {
      expect(errorDataMapper({})).toMatchObject({ message: 'An error occurred.' });
    });
  });
});
