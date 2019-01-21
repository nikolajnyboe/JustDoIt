import React from 'react';
import styled from 'styled-components';
import {get} from '../helpers/utils';
import {Listing, Input, Button, DeleteButton, MultiSelect} from './SubComponents';

const EditForm = styled.form`
  width: 100%;
`;

const Container = styled.div`
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
    selectedUsers: [],
    isLoadingUsers: true
  }

  async componentDidMount() {
    this.setState({
      name: this.props.project.name,
      selectedUsers: this.props.project.collaborators
    });
    let users = await get('/api/users');
    users = users.filter(user => user._id !== this.props.project.owner._id);
    this.setState({
      users,
      isLoadingUsers: false
    });
  }

  saveProject = event => {
    event.preventDefault();
    const collaborators = this.state.selectedUsers.length > 0 ? this.state.selectedUsers : 'undefined';
    const updatedProject = {
      name: this.state.name,
      collaborators
    };
    this.props.editProject(this.props.project._id, updatedProject);
    this.props.resetEditState();
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelect = selectedUsers => {
    this.setState({selectedUsers});
  }

  render() {
    return (
      <Listing>
        <EditForm onSubmit={this.saveProject}>
          <Container>
            <Input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              placeholder='Project name'
            />
            <SaveButton type='submit'>Save</SaveButton>
            <DeleteButton marginLeft type='button' onClick={this.props.resetEditState}>Cancel</DeleteButton>
          </Container>
          <MultiSelect
            value={this.state.selectedUsers}
            onChange={this.handleSelect}
            options={this.state.users}
            placeholder='Add collaborators'
            getOptionLabel={(user) => user.name}
            getOptionValue={(user) => user._id}
            isLoading={this.state.isLoadingUsers}
          />
        </EditForm>
      </Listing>
    )
  }
};

export default EditProjectForm;