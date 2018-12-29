import React from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';

const Grid = styled.div`
  grid-area: project;
  padding-right: 15px;
`;

class Project extends React.Component {
  title = React.createRef();

  addTask = event => {
    event.preventDefault();
    const title = this.title.current.value;
    this.props.addTask(title);
  }

  render() {
    const {name, tasks} = this.props.project;

    return(
      <Grid>
        <h2>{name}</h2>
        <form onSubmit={this.addTask}>
          <h3>Add Task:</h3>
          <input required name="title" type="text" placeholder="Title" ref={this.title} />
          <button type="submit">Add Task</button>
        </form>
        <TaskList
          tasks={tasks}
          updateTaskStatus={this.props.updateTaskStatus}
          deleteTask={this.props.deleteTask}
        />
      </Grid>
    )
  }

};

export default Project;