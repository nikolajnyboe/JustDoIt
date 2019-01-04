import React from 'react';
import styled from 'styled-components';
import {post} from '../helpers/utils';
import Navigation from './Navigation';
import {Button, Input} from './SubComponents';

const LoginGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 80px auto;
  grid-template-areas:
    "nav nav nav"
    ". form .";
  min-height: 100vh;
`;

const Form = styled.form`
  grid-area: form;
`;

const LoginInput = styled(Input)`
  width: calc(100% - 28px);
  margin: 0;
  margin-bottom: 20px;
`;

class App extends React.Component {

  state = {
    error: null
  }

  email = React.createRef();
  password = React.createRef();

  login = async (event) => {
    event.preventDefault();
    this.setState({error: null});
    const email = this.email.current.value;
    const password = this.password.current.value;
    const res = await post('/api/login', `email=${email}&password=${password}`);
    if (res.error) {return this.setState({error: res.message});}
    this.props.history.push('/');
  }

  render() {
    return (
      <LoginGrid>
        <Navigation />
        <Form onSubmit={this.login}>
          <h2>Login</h2>
          <LoginInput type="text" required placeholder="Email" ref={this.email} />
          <LoginInput type="password" required placeholder="Password" ref={this.password} />
          {!this.state.error ? null : (
            <p>{this.state.error}</p>
          )}
          <Button type="submit">Login</Button>
        </Form>
      </LoginGrid>
    )
  }
};

export default App;
