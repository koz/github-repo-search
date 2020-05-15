import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

const StyledForm = styled.form`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

const SearchForm = ({ className, onChange = () => {}, onSubmit = () => {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <StyledForm onSubmit={handleSubmit} className={className} data-testid="search-form">
      <Input onChange={onChange} placeholder="Find a repository..." data-testid="search-input" />
      <StyledButton>Search</StyledButton>
    </StyledForm>
  );
};

SearchForm.propTypes = propTypes;

export default SearchForm;
