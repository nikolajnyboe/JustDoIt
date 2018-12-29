import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton} from './SubComponents';

const Checkbox = styled.input`
  font-size: 1rem;
  vertical-align: text-bottom;
`;

class Task extends React.Component {

  updateTaskStatus = event => {
    this.props.updateTaskStatus(this.props.details._id, event.target.checked);
  }

  editTask = () => {
    console.log(this.props.details._id);
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.details._id);
  }

  render() {
    const {title, completed} = this.props.details;

    return(
      <Listing>
        <Checkbox
          name="completed"
          type="checkbox"
          checked={completed}
          onChange={this.updateTaskStatus}
        />
        {title}
        <Button type="button" onClick={this.editTask}>Edit</Button>
        <DeleteButton type="button" onClick={this.deleteTask}>Delete</DeleteButton>
      </Listing>
    )
  }
};

export default Task;