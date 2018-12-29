import React from 'react';
import styled from 'styled-components';
import Task from './Task';

const List = styled.ul`
  padding: 0;
`;

class TaskList extends React.Component {

  render() {
    return (
      <>
        <p>List of tasks:</p>
        <List>
          {this.props.tasks.map(task => (
            <Task
              key={task._id}
              details={task}
              updateTaskStatus={this.props.updateTaskStatus}
              deleteTask={this.props.deleteTask}
            />
          ))}
        </List>
      </>
    )
  }

};

export default TaskList;