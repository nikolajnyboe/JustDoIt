import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from './SubComponents';

const Grid = styled.div`
  grid-area: nav;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  background-color: #0074D9;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Logo = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin-right: auto;
`;

const User = styled(Link)`
  color: inherit;
  font-weight: 600;
  text-decoration: none;
`;

const LogoutButton = styled(Button)`
  margin: 0 0 0 20px;
`;

class Navigation extends React.Component {
  render() {
    return(
      <Grid>
        <Logo to='/'><h1>Just Do It</h1></Logo>
        {!this.props.name ? null : (
          <User to='/profile'>{this.props.name}</User>
        )}
        {!this.props.logout ? null : (
          <LogoutButton type="button" onClick={this.props.logout}>
            Log out
          </LogoutButton>
        )}
      </Grid>
    )
  }
};

export default Navigation;