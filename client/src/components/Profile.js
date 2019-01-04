import React from 'react';
import styled from 'styled-components';
import {get} from '../helpers/utils';
import Navigation from './Navigation';

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 80px auto;
  grid-template-areas:
    "nav nav nav"
    ". details .";
  grid-gap: 20px;
  min-height: 100vh;
`;

const ProfileDetails = styled.div`
  grid-area: details;
`;

class Profile extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const user = await get('/api/users-current');
    if (!user._id) {
      return this.props.history.push('/login');
    }
    this.setState({user});
  }

  logout = async () => {
    const user = await get('/api/logout');
    if (user.loggedOut) {
      return this.props.history.push('/login');
    }
  }

  render() {
    return (
      <ProfileGrid>
        <Navigation
          name={this.state.user.name}
          logout={this.logout}
        />
        <ProfileDetails>
          <h1>Profile</h1>
          <h2>{this.state.user.name}</h2>
        </ProfileDetails>
      </ProfileGrid>
    )
  }
};

export default Profile;