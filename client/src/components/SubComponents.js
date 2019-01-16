import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

export const Button = styled.button`
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 14px;
  margin: 0;
  margin-left: 20px;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  background: #fff;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .025em;
  color: #0074D9;
  text-decoration: none;
  transition: all .15s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-1px);
    box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3);
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  }
`;

export const DeleteButton = styled(Button)`
  color: #fff;
  background: #ec5555;
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 14px;
  margin-right: 20px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  vertical-align: bottom;
  font-size: 15px;
  color: #525f7f;

  ::placeholder {
    font-size: 15px;
    color: #525f7f;
  }
`;

export const Listing = styled.li`
  list-style: none;
  margin-bottom: 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid rgba(82, 95, 127, 0.2);
`;

const singleSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    marginTop: '20px'
  }),
  input: (provided, state) => ({
    ...provided,
    fontSize: '15px',
    color: '#525f7f'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: '15px',
    color: '#525f7f'
  }),
  menu: (provided, state) => ({
    ...provided,
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    padding: '0'
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: '0',
    borderRadius: '4px'
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '15px',
    color: '#525f7f',
    padding: '10px',
    borderBottom: '1px solid rgba(82, 95, 127, 0.2)',
    backgroundColor: state.isFocused ? 'rgba(0, 116, 217, 0.1)' : '#fff',
    ':last-child': {
      borderBottom: 'none'
    }
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: '15px',
    color: '#525f7f'
  }),
};

export const SingleSelect = props => {
  return (
    <Select
      {...props}
      styles={singleSelectStyles}
      isClearable={true}
    />
  );
};

const multiSelectStyles = {
  ...singleSelectStyles,
  multiValue: (provided, state) => ({
    ...provided,
    background: '#0074D9',
    color: '#fff'
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#fff'
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    borderRadius: '0px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    ':hover': {
      backgroundColor: '#ec5555',
      color: '#fff'
    }
  }),
};

export const MultiSelect = props => {
  return (
    <Select
      {...props}
      styles={multiSelectStyles}
      isMulti={true}
      closeMenuOnSelect={false}
    />
  );
};