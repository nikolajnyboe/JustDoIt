import React from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import {Button, Input} from './SubComponents';
import {get} from '../helpers/utils';

const Grid = styled.div`
  grid-area: main;
  padding: 0 20px;
`;

const Title = styled.h2`
  display: inline-block;
  margin-right: 20px;
`;

class Project extends React.Component {
  state = {
    tasks: [],
    showNewTask: false
  }

  async componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      this.setState({tasks: this.props.project.tasks});
      if (this.props.project.type === 'label') {
        const tasks = await get(`/api/labels/${this.props.project._id}/tasks`);
        this.setState({tasks});
      }
    }
  }

  addTask = event => {
    event.preventDefault();
    const title = this.title.current.value;
    this.props.addTask(title);
    this.setState({showNewTask: false});
  }

  title = React.createRef();

  render() {
    const {name, owner, collaborators, type} = this.props.project;
    const tasks = this.state.tasks;

    return(
      <Grid>
        <Title>{name}</Title>
        {type === 'label' ? null : (
          <Button type="button" onClick={() => this.setState({showNewTask: !this.state.showNewTask})}>New</Button>
        )}
        {!this.state.showNewTask ? null : (
          <form onSubmit={this.addTask}>
            <Input required name="title" type="text" placeholder="Task title" ref={this.title} />
            <Button type="submit">Save</Button>
          </form>
        )}
        <TaskList
          type={type}
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