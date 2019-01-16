import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton} from './SubComponents';
import {formatDate} from '../helpers/utils';

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
  margin-right: auto;
`;

const DueDate = styled.div`
  font-size: 85%;
  font-weight: 600;
  text-transform: uppercase;
  margin: 12px 0 0 0;
`;

const Assigned = styled.p`
  margin: 8px 0 0 10px;
  font-size: 85%;
  font-weight: 600;
`;

const Label = styled.p`
  background-color: #0074D9;
  color: #fff;
  height: 22px;
  line-height: 22px;
  padding: 0 10px;
  border-radius: 2px;
  font-size: 85%;
  font-weight: 600;
  margin: 9px 0 0 10px;
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
    const {title, completed, assignedUser, dueDate, labels} = this.props.details;

    return(
      <TaskListing>
        <Checkbox
          name="completed"
          type="checkbox"
          checked={completed}
          onChange={this.updateTaskStatus}
        />
        <TaskTitle>{title}</TaskTitle>
        {!dueDate ? null : (
          <DueDate>{formatDate(dueDate)}</DueDate>
        )}
        {!assignedUser ? null : (
          <Assigned><span role="img" aria-label={`The task is assigned to ${assignedUser.name}`}>👤</span> {assignedUser.name}</Assigned>
        )}
        {!labels.length > 0 ? null : (
          labels.map(label => (
            <Label key={label._id}>{label.title}</Label>
          ))
        )}
        {this.props.type === 'label' ? null : (
          <Button type="button" onClick={this.setEditState}>Edit</Button>
        )}
        <DeleteButton type="button" onClick={this.deleteTask}>Delete</DeleteButton>
      </TaskListing>
    )
  }
};

export default Task;