describe('index', () => {
  test('renders without crashing', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'container');
    document.body.appendChild(root);
    /* Require needed to create the container element before executing index.js' */
    // eslint-disable-next-line global-require
    require('./index');
    expect(root.childNodes).not.toHaveLength(0);
  });
});
