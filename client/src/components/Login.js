import React from 'react';
import {post} from '../helpers/utils';

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
      <>
        <form onSubmit={this.login}>
          <h2>Please login</h2>
          <input type="text" required placeholder="Email" ref={this.email} />
          <input type="password" required placeholder="Password" ref={this.password} />
          <button type="submit">Login</button>
        </form>
        <p>{this.state.error}</p>
      </>
    )
  }
};

export default App;
