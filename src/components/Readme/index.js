import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import Markdown from '../Markdown';

const propTypes = {
  error: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
  }),
  content: PropTypes.string,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

const Readme = ({ className, error, content, 'data-testid': testId }) => {
  return (
    <div className={className} data-testid={testId}>
      {error && <Text>{error.code === 404 ? error.message : 'An error occurred.'}</Text>}
      {content && !error && <Markdown content={content} />}
    </div>
  );
};

Readme.propTypes = propTypes;

export default Readme;
