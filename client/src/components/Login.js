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

const LoginButton = styled(Button)`
  margin: 0;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class App extends React.Component {

  state = {
    showSignUpForm: false,
    error: null
  }

  name = React.createRef();
  email = React.createRef();
  password = React.createRef();
  confirmPassword = React.createRef();

  login = async event => {
    event.preventDefault();
    this.setState({error: null});
    const email = this.email.current.value;
    const password = this.password.current.value;
    const res = await post('/api/login', `email=${email}&password=${password}`);
    if (res.error) {return this.setState({error: res.message});}
    this.props.history.push('/');
  }

  signup = async event => {
    event.preventDefault();
    this.setState({error: null});
    const name = this.name.current.value;
    const email = this.email.current.value;
    const password = this.password.current.value;
    const confirmPassword = this.confirmPassword.current.value;
    if (password === confirmPassword) {
      const res = await post('/api/users', `name=${name}&email=${email}&password=${password}`);
      if (res.error) return this.setState({error: res.message});
      const response = await post('/api/login', `email=${email}&password=${password}`);
      if (response.error) return this.setState({error: response.message});
      this.props.history.push('/');
    } else {
      this.setState({error: 'The passwords does not match.'});
    }
  }

  render() {
    return (
      <LoginGrid>
        <Navigation />
        {this.state.showSignUpForm ? (
          <Form onSubmit={this.signup}>
            <h2>Sign Up</h2>
            <LoginInput type="text" required placeholder="Name" ref={this.name} />
            <LoginInput type="text" required placeholder="Email" ref={this.email} />
            <LoginInput type="password" required placeholder="Password" ref={this.password} />
            <LoginInput type="password" required placeholder="Confirm Password" ref={this.confirmPassword} />
            {!this.state.error ? null : (
              <p>{this.state.error}</p>
            )}
            <FlexContainer>
              <LoginButton type="submit">Sign up</LoginButton>
              <LoginButton type="button" onClick={() => this.setState({showSignUpForm: !this.state.showSignUpForm})}>Log in</LoginButton>
            </FlexContainer>
          </Form>
        ) : (
          <Form onSubmit={this.login}>
            <h2>Log in</h2>
            <LoginInput type="text" required placeholder="Email" ref={this.email} />
            <LoginInput type="password" required placeholder="Password" ref={this.password} />
            {!this.state.error ? null : (
              <p>{this.state.error}</p>
            )}
            <FlexContainer>
              <LoginButton type="submit">Log in</LoginButton>
              <LoginButton type="button" onClick={() => this.setState({showSignUpForm: !this.state.showSignUpForm})}>Sign up</LoginButton>
            </FlexContainer>
          </Form>
        )}
      </LoginGrid>
    )
  }
};

export default App;
