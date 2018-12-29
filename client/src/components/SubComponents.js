import styled from 'styled-components';

export const Button = styled.button`
  font-weight: bold;
  font-size: 1rem;
  border: 2px solid;
  border-color: ${props => props.white ? "white" : "gray"};
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
  cursor: pointer;
  margin: 0 10px;
  color: ${props => props.white ? "white" : "black"};
  background: transparent;
`;

export const DeleteButton = styled(Button)`
  border: none;
  color: #fff;
  background: #f14646;
`;

export const Listing = styled.li`
  cursor: pointer;
  list-style: none;
  margin-bottom: 15px;
`;