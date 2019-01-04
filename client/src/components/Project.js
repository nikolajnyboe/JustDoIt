import React from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import {Button, Input} from './SubComponents';

const Grid = styled.div`
  grid-area: project;
  padding: 0 20px;
`;

const Title = styled.h2`
  display: inline-block;
  margin-right: 20px;
`;

class Project extends React.Component {
  state = {
    showNewTask: false
  }

  title = React.createRef();

  addTask = event => {
    event.preventDefault();
    const title = this.title.current.value;
    this.props.addTask(title);
    this.setState({showNewTask: false});
  }

  render() {
    const {name, tasks, collaborators, owner} = this.props.project;

    return(
      <Grid>
        <Title>{name}</Title>
        <Button type="button" onClick={() => this.setState({showNewTask: !this.state.showNewTask})}>New</Button>
        {!this.state.showNewTask ? null : (
          <form onSubmit={this.addTask}>
            <Input required name="title" type="text" placeholder="Task title" ref={this.title} />
            <Button type="submit">Save</Button>
          </form>
        )}
        <TaskList
          tasks={tasks}
          owner={owner}
          collaborators={collaborators}
          updateTaskStatus={this.props.updateTaskStatus}
          editTask={this.props.editTask}
          deleteTask={this.props.deleteTask}
        />
      </Grid>
    )
  }

};

export default Project;