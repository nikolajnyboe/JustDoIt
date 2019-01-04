import React from 'react';
import styled from 'styled-components';
import {get} from '../helpers/utils';
import {Listing, Input, Button, DeleteButton, Select} from './SubComponents';

const EditForm = styled.form`
  display: flex;
  width: 100%;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
`;

class EditProjectForm extends React.Component {
  state = {
    name: '',
    users: [],
    selectedUser: '',
    selectionHasChanged: false
  }

  async componentDidMount() {
    const users = await get('/api/users');
    this.setState({
      name: this.props.project.name,
      users,
      selectedUser: users[0]._id
    })
  }

  saveProject = event => {
    event.preventDefault();
    const collaborators = [...this.props.project.collaborators];
    if (this.state.selectionHasChanged) {
      const indexOfSelectedUser = this.state.users.findIndex(user => user._id === this.state.selectedUser);
      const selectedUser = this.state.users[indexOfSelectedUser];
      collaborators.push(selectedUser);
    }
    const updatedProject = {
      ...this.props.project,
      name: this.state.name,
      collaborators
    };
    this.props.editProject(this.props.project._id, updatedProject);
    this.props.resetEditState();
  }

  handleChange = event => {
    if (event.target.name === 'selectedUser') {
      return this.setState({[event.target.name]: event.target.value, selectionHasChanged: true});
    }
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <Listing>
        <EditForm onSubmit={this.saveProject}>
          <Input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          <Select name='selectedUser' value={this.state.selectedUser} onChange={this.handleChange}>
            {this.state.users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </Select>
          <SaveButton type='submit'>Save</SaveButton>
        </EditForm>
        <DeleteButton onClick={this.props.resetEditState}>Cancel</DeleteButton>
      </Listing>
    )
  }
};

export default EditProjectForm;