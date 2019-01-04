import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 14px;
  margin: 0 10px 0 auto;
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
  margin: 0 0 0 10px;
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
`;

export const Select = styled.select`
  height: 38px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  font-size: 15px;
  color: #525f7f;
  padding: 0 14px;
  margin-right: 20px
`;

export const Listing = styled.li`
  list-style: none;
  margin-bottom: 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid rgba(82, 95, 127, 0.2);
`;