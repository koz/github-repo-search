import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../Input';

const StyledForm = styled.form`
  display: flex;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
  width: 100%;
`;

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

const SearchForm = ({ value = '', className, onChange = () => {}, onSubmit = () => {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <StyledForm onSubmit={handleSubmit} className={className} data-testid="search-form">
      <Input value={value} onChange={onChange} placeholder="Search" data-testid="search-input" />
    </StyledForm>
  );
};

SearchForm.propTypes = propTypes;

export default SearchForm;
