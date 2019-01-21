import React from 'react';
import styled from 'styled-components';
import {Listing, Input, Button, DeleteButton, SingleSelect, MultiSelect} from './SubComponents';
import {get} from '../helpers/utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditForm = styled.form`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
`;

const CustomDatePicker = styled(DatePicker)`
  height: 38px;
  padding: 0 14px;
  margin-right: 20px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  vertical-align: bottom;
  font-size: 15px;
  color: #525f7f;

  ::placeholder {
    font-size: 15px;
    color: #525f7f;
  }
`;

const SaveButton = styled(Button)`
  margin-left: auto;
`;

class EditTaskForm extends React.Component {
  state = {
    title: '',
    teamMembers: [],
    selectedUser: '',
    labels: [],
    selectedLabels: [],
    isLoadingLabels: true,
    dueDate: null
  }

  async componentDidMount() {
    const dueDate = this.props.details.dueDate ? new Date(this.props.details.dueDate) : null;
    const selectedUser = this.props.details.assignedUser ? this.props.details.assignedUser : '';
    const teamMembers = [
      this.props.owner,
      ...this.props.collaborators
    ];
    this.setState({
      title: this.props.details.title,
      teamMembers,
      selectedUser,
      selectedLabels: this.props.details.labels,
      dueDate
    });
    const labels = await get('/api/labels');
    this.setState({
      labels,
      isLoadingLabels: false
    });
  }

  saveTask = event => {
    event.preventDefault();
    const assignedUser = this.state.selectedUser ? this.state.selectedUser : 'undefined';
    const labels = this.state.selectedLabels.length > 0 ? this.state.selectedLabels : 'undefined';
    const dueDate = this.state.dueDate ? this.state.dueDate : 'undefined';
    const updatedTask = {
      ...this.props.details,
      title: this.state.title,
      assignedUser,
      labels,
      dueDate
    };
    this.props.editTask(this.props.details._id, updatedTask);
    this.props.resetEditTask();
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelect = selectedUser => {
    this.setState({selectedUser});
  }

  handleSelectLabels = selectedLabels => {
    this.setState({selectedLabels});
  }

  handleSelectDate = dueDate => {
    console.log(dueDate);
    this.setState({dueDate});
  }

  render() {
    return (
      <Listing>
        <EditForm onSubmit={this.saveTask}>
          <Container>
            <Input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              placeholder='Task title'
            />
            <CustomDatePicker
              selected={this.state.dueDate}
              onChange={this.handleSelectDate}
              placeholderText='Set Due-Date'
              isClearable
              dateFormat="dd/MM/yyyy"
            ></CustomDatePicker>
            <SaveButton type='submit'>Save</SaveButton>
            <DeleteButton marginLeft type='button' onClick={this.props.resetEditTask}>Cancel</DeleteButton>
          </Container>
          <ContainerGrid>
            <SingleSelect
              value={this.state.selectedUser}
              onChange={this.handleSelect}
              options={this.state.teamMembers}
              placeholder='Assign team member'
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user._id}
            />
            <MultiSelect
              value={this.state.selectedLabels}
              onChange={this.handleSelectLabels}
              options={this.state.labels}
              placeholder='Add labels'
              getOptionLabel={(label) => label.title}
              getOptionValue={(label) => label._id}
              isLoading={this.state.isLoadingLabels}
            />
          </ContainerGrid>
        </EditForm>
      </Listing>
    )
  }
};

export default EditTaskForm;