import React from 'react';
import styled from 'styled-components';
import {Button} from './SubComponents';

const Grid = styled.div`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "logo . . user logout";
  justify-items: center;
  align-items: center;
  color: #fff;
  background-color: #0074D9;
`;

const Logo = styled.h1`
  grid-area: logo;
`;

const User = styled.p`
  grid-area: user;
`;

const LogoutButton = styled(Button)`
  grid-area: logout;
`;

class Navigation extends React.Component {
  render() {
    return(
      <Grid>
        <Logo>Just Do It</Logo>
        <User>{this.props.name}</User>
        <LogoutButton white type="button" onClick={this.props.logout}>
          Logout
        </LogoutButton>
      </Grid>
    )
  }
};

export default Navigation;