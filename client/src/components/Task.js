import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton} from './SubComponents';

const TaskListing = styled(Listing)`
  position: relative;
`;

const Checkbox = styled.input`
  font-size: 1rem;
  vertical-align: text-bottom;
  margin-right: 10px;
  margin-top: 10px;
`;

const TaskTitle = styled.p`
  margin: 0;
  margin-top: 10px;
`;

const Shared = styled.span`
  position: absolute;
  top: -15px;
  left: 4px;
`;

class Task extends React.Component {

  updateTaskStatus = event => {
    this.props.updateTaskStatus(this.props.details._id, {completed: event.target.checked});
  }

  setEditState = () => {
    this.props.setEditState(this.props.details._id);
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.details._id);
  }

  render() {
    const {title, completed, assignedUser} = this.props.details;

    return(
      <TaskListing>
        <Checkbox
          name="completed"
          type="checkbox"
          checked={completed}
          onChange={this.updateTaskStatus}
        />
        <TaskTitle>{title}</TaskTitle>
        {!assignedUser ? null : (
          <Shared>👤 {assignedUser.name}</Shared>
        )}
        <Button type="button" onClick={this.setEditState}>Edit</Button>
        <DeleteButton type="button" onClick={this.deleteTask}>Delete</DeleteButton>
      </TaskListing>
    )
  }
};

export default Task;