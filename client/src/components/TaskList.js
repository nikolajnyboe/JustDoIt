import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import EditTaskForm from './EditTaskForm';

const List = styled.ul`
  padding: 0;
`;

class TaskList extends React.Component {
  state = {
    editTask: null
  }

  setEditState = taskId => {
    this.setState({editTask: taskId});
  }

  resetEditTask = () => {
    this.setState({editTask: null});
  }

  render() {
    return (
      <List>
        {this.props.tasks.map(task => (
          this.state.editTask === task._id ? (
            <EditTaskForm
              key={task._id}
              details={task}
              owner={this.props.owner}
              collaborators={this.props.collaborators}
              editTask={this.props.editTask}
              resetEditTask={this.resetEditTask}
            />
          ) : (
            <Task
              key={task._id}
              type={this.props.type}
              details={task}
              collaborators={this.props.collaborators}
              updateTaskStatus={this.props.updateTaskStatus}
              setEditState={this.setEditState}
              deleteTask={this.props.deleteTask}
            />
          )
        ))}
      </List>
    )
  }

};

export default TaskList;