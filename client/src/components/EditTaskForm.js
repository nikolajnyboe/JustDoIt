import React from 'react';
import styled from 'styled-components';
import {Listing, Input, Button, DeleteButton, Select} from './SubComponents';

const EditForm = styled.form`
  display: flex;
  width: 100%;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
`;

class EditTaskForm extends React.Component {
  state = {
    title: '',
    collaborators: [],
    selectedUser: '',
    selectionHasChanged: false
  }

  componentDidMount() {
    this.setState({
      title: this.props.details.title,
      collaborators: this.props.collaborators
    })
  }

  saveTask = event => {
    event.preventDefault();
    let assignedUser = '';
    if (this.state.selectionHasChanged) {
      if (this.state.selectedUser === this.props.owner._id) {
        assignedUser = this.props.owner;
      } else {
        const indexOfSelectedUser = this.state.collaborators.findIndex(user => user._id === this.state.selectedUser);
        const selectedUser = this.state.collaborators[indexOfSelectedUser];
        assignedUser = selectedUser;
      }
    }
    const updatedTask = {
      ...this.props.details,
      title: this.state.title,
      assignedUser
    };
    console.log(updatedTask);
    this.props.editTask(this.props.details._id, updatedTask);
    this.props.resetEditTask();
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
        <EditForm onSubmit={this.saveTask}>
          <Input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
          <Select name='selectedUser' value={this.state.selectedUser} onChange={this.handleChange}>
            <option key='123' value=''>No user</option>
            <option key={this.props.owner._id} value={this.props.owner._id}>{this.props.owner.name}</option>
            {this.state.collaborators.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </Select>
          <SaveButton type='submit'>Save</SaveButton>
        </EditForm>
        <DeleteButton onClick={this.props.resetEditTask}>Cancel</DeleteButton>
      </Listing>
    )
  }
};

export default EditTaskForm;