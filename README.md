# Github Repositories Search

## 🚀 Quickstart

1.  **Install dependencies.**

    ```shell
    yarn
    ```

1.  **Start developing.**

    Start the development of the project by installing the dependency packages and running the project:

    ```shell
    yarn start
    ```

❕Check the GitHub OAuth token [configuration instructions](#rate-limit) for better use of the application.

## Root Directory Overview

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── coverage
    ├── dist
    ├── node_modules
    ├── spec
    ├── src
    ├── .babelrc
    ├── .env
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierrc
    ├── jest.config.js
    ├── package.json
    ├── README.md
    ├── webpack.config.js
    └── yarn.lock

1. **`/coverage`**: This directory contains the latest tests coverage report from `jest`.

1. **`/dist`**: This directory contains the static build of the site. It is generated when you run `yarn build`. More details in the [section](#coverage) below.

1. **`/node_modules`**: This directory contains all of the modules of code that the project depends on (npm packages).

1. **`/spec`**: This directory contains files related to `jest` testing, like utilities and setup files. [Check more about it](#testing).

1. **`/src`**: This directory will contain all of the code related to the application. [Read more about it](#source-code-architecture).

1. **`.babelrc`**: This file contains `Babel` parser configuration, check [Babel's documentation](https://babeljs.io/docs/en/config-files) for more reference.

1. **`.env`**: [Dotenv](https://github.com/motdotla/dotenv) files are used to load different variables on the application. Currently being used to load a Github OAuth token to increase the API rate limit on requests. Check the section about the [API rate limit](#rate-limit)

1. **`.eslintrc`**: This is a configuration file for [ESLint](https://eslint.org/).

1. **`.gitignore`**: This file tells git which files it should not track.

1. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/).

1. **`jest.config.js`**: This is a configuration file for [Jest](https://jestjs.io/), the testing framework of this project.

1. **`package.json`**: A manifest file for the project, which including metadata about the project, like name, author, etc.

1. **`README.md`**: The file that you're reading right now!

1. **`webpack.config.js`**: This is a configuration file for [Webpack](https://webpack.js.org/), the code bundler, and development server for this project.

1. **`yarn.lock`** This is an automatically generated file based on the exact versions of the npm dependencies that were installed for this project.

---

## Technical Overview

### Source code architecture

    .
    ├── api
    ├── assets
    ├── components
    ├── hooks
    ├── pages
    ├── redux
    ├── styles
    ├── App.js
    ├── index.js
    └── Routes.js

1. **`api`**: This folder contains the functions that access directly Github's API. It also has a `utils` file with utility functions shared across the API functions. More details on the [API section](#api).

1. **`assets`**: This folder contains the static files used across the application, such as SVG icons.

1. **`components`**: This folder contains all the components in this application, except for page-level components.

1. **`hooks`**: This folder contains all custom hooks used by the components. Read more about it on the [Hooks section](#hooks).

1. **`pages`**: This folder contains the page level components. Check the [Pages section](#pages) below.

1. **`redux`**: This folder contains all the Redux logic, such as actions, action creators, reducers, selectors, thunks, and also utility functions. Check the [Redux section](#redux) for detailed information.

1. **`styles`**: This folder contains shared styles such as breakpoints, text styles, global styles, colors constants. More details in the [Styling section](#styling)

1. **`App.js`**: This file is the root React component adding top-level configuration, such as a router, global styling, and store provider.

1. **`index.js`**: This file is the entry point of the application, it finds the dom element container and render the `App.js` inside.

1. **`Routes.js`**: This component defines the routes of this application.

### API

This application uses [GitHub API v3](https://developer.github.com/v3/) for data fetching using the browser's `fetch`.
The endpoints being used are:

- `https://api.github.com/search/repositories` - Used for searching public repositories using a text query.
- `https://api.github.com/repos/{owner}/{repo}` - Used for getting details about a specific repository, it brings additional data required for the Detail page, such as watchers count.
- `https://api.github.com/repos/{owner}/{repo}/contents` - Used for listing the contents of a specific repository, such as README files.
- `https://api.github.com/users/{owner}` - Used for getting details about a specific user.
- `https://api.github.com/users/{owner}/orgs` - Used for listing publicized organization memberships of a specific user.
- `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}` - User for getting raw content files from a repository, such as a markdown content from README files.

##### Rate limit

GitHub API has a very small [rate limit](https://developer.github.com/v3/#rate-limiting) of 60 requests per hour if there's no authentication. To get around this a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) can be generated on GitHub and set to a variable name `GITHUB_OAUTH_TOKEN` in a `.env` file on the project root.

```
GITHUB_OAUTH_TOKEN={token}
```

### Hooks

This application has custom hooks that handle the connection with redux store, and additional logic that could be abstracted from components and re-used if necessary.

- `useBackButton` - This hook exports a handleClick callback function and a state to determine whether the back button should be shown or not.
- `useRepositoryData` - This hook exports repository and owner data and also README markdown content. It's also responsible for dispatching the necessary actions to fetch those if the data is not already present.
- `useSearchQueryString` - This hook handles the query string from the URL, exporting the page and query from it and also a handleChange to be used in a search input to update the URL.
- `useSearchResults` - This hook export everything related to the search results, such as pagination information,results' count, repositories list, request's response time, loading, and error state. It uses the pagination and query it receives as params to fetch all the data that's not present.

### Pages

Page-level components are the top-level components rendered by `react-router` routes, those components are responsible for getting the necessary data, and pass it to the children components it uses to assemble the page.

### Redux

Redux is being used to persist data across the application, with [`redux-thunk`](https://github.com/reduxjs/redux-thunk) to create asynchronous actions for data fetching.

##### Actions

The action types are defined in constants shared between action creators and reducers, inside `action.js` file. The `actionCreators.js` file is responsible for exporting functions that receive params and return action objects as `{ type, payload }`.

##### Reducers

Each reducer has it's own files and `reducers/index.js` file exports all of them combined using [`combineReducers`](https://redux.js.org/api/combinereducers).

##### Selectors

Functions using [`useSelector`](https://react-redux.js.org/api/hooks) hook from `react-redux` are defined and exported on `selectors/index.js` to access the store state.

##### Thunks

Those are asynchronous actions that dispatch other actions and handles the data fetching.

##### Utils

Helper functions used in thunks such as data mappers and parsers.

The `createStore.js` file exports a function that receives an initial state and initializes the store, using the reducers and also applying `redux-thunk` as a middleware.

### Styling

The components are styled using [`styled-components`](https://styled-components.com/), the styled components are usually defined inside the component file. Shared styled components such as `<Text />`, should be inside the `components` folder.

Constants such as breakpoint values, color HEX, and also shared styles such as text styles (that could be applied to different components), are defined inside `/styles`.

### Testing

This projects use [Jest](https://jestjs.io/) for testing, with [`jest-dom`](https://github.com/testing-library/jest-dom) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to test React components.

##### Utils

The `spec/utils` folder contains some utilities to reduce boilerplates and facilitate custom hooks testing.

- `renderWithContext.js`: This file exports three render functions implemented on top of the React Testing Library's [`render` function](https://testing-library.com/docs/react-testing-library/api#render), for tests of components that use `react-router` and/or `redux` logic inside.
  - `renderWithRouter` render a component wrapped inside a Router, with the possibility of receiving a custom history, for better testing.
  - `renderWithProvider` render a component wrapped inside a Redux Provider, that can receive an initial state as param.
  - `renderWithContext` uses the same API as the two above to render a component wrapped inside a Redux Provider and a Router.
- `renderHook.js`: This file export a render function using the `renderWithContext` described above, for rendering a custom React hook, returning the value returned by the hook.

##### Coverage

The `jest.config.js` file has the collect coverage option on, so every time a `yarn test` is used, a new coverage report is showed on the terminal and also generated inside the `coverage` folder.
To check a more detailed coverage report, open the `coverage/lcov-report/index.html` on a browser.
