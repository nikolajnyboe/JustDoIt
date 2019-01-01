import React from 'react';
import styled from 'styled-components';
import {get, post, patch, remove} from '../helpers/utils';
import Navigation from './Navigation';
import ProjectList from './ProjectList';
import Project from './Project';

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 80px auto;
  grid-template-areas:
    "nav nav nav"
    "list project project";
  grid-gap: 15px;
  min-height: 100vh;
`;

class App extends React.Component {
  state = {
    user: {
      projects: []
    },
    currentProject: {
      tasks: []
    }
  }

  async componentDidMount() {
    const user = await get('/api/users-current');
    if (!user._id) {
      return this.props.history.push('/login');
    }
    this.setState({
      user,
      currentProject: user.projects[0]
    });
  }

  logout = async () => {
    const user = await get('/api/logout');
    if (user.loggedOut) {
      return this.props.history.push('/login');
    }
  }

  addTask = async title => {
    const task = await post(
      '/api/tasks',
      `title=${title}&projectId=${this.state.currentProject._id}`
    );
    const currentProject = {...this.state.currentProject};
    currentProject.tasks.push(task);
    this.setState({currentProject});
  }

  updateTaskStatus = async (taskId, status) => {
    const updatedTask = await patch(
      `/api/tasks/${taskId}`,
      `completed=${status}`
    );
    const currentProject = {...this.state.currentProject};
    const indexOfUpdatedTask = currentProject.tasks.findIndex(task => task._id === taskId)
    currentProject.tasks = [
      ...currentProject.tasks.slice(0, indexOfUpdatedTask),
      updatedTask,
      ...currentProject.tasks.slice(indexOfUpdatedTask + 1)
    ];
    this.setState({currentProject});
  }

  deleteTask = async taskId => {
    await remove(`/api/tasks/${taskId}`);
    const currentProject = {...this.state.currentProject};
    const indexOfDeletedTask = currentProject.tasks.findIndex(task => task._id === taskId)
    currentProject.tasks = [
      ...currentProject.tasks.slice(0, indexOfDeletedTask),
      ...currentProject.tasks.slice(indexOfDeletedTask + 1)
    ];
    this.setState({currentProject});
  }

  addProject = async name => {
    const project = await post(
      '/api/projects',
      `name=${name}`
    );
    const user = {...this.state.user};
    user.projects.push(project);
    this.setState({user});
  }

  changeProject = project => {
    const user = this.state.user;
    const currentProject = this.state.currentProject;
    const indexOfCurrentProject = user.projects.findIndex(foundProject => foundProject._id === currentProject._id);
    user.projects = [
      ...user.projects.slice(0, indexOfCurrentProject),
      currentProject,
      ...user.projects.slice(indexOfCurrentProject + 1)
    ];
    this.setState({user, currentProject: project});
  }

  deleteProject = async projectId => {
    await remove(`/api/projects/${projectId}`);
    const user = {...this.state.user};
    const indexOfDeletedProject = user.projects.findIndex(project => project._id === projectId)
    user.projects = [
      ...user.projects.slice(0, indexOfDeletedProject),
      ...user.projects.slice(indexOfDeletedProject + 1)
    ];
    this.setState({user});
    if (this.state.currentProject._id === projectId) {
      if (this.state.user.projects.length > 0) {
        this.changeProject(this.state.user.projects[0]);
      } else {
        this.changeProject(null);
      }
    }
  }

  handleSelect = project => {
    console.log(project);
  }

  render() {
    return (
      <AppGrid>
        <Navigation
          name={this.state.user.name}
          logout={this.logout}
        />
        <ProjectList
          projects={this.state.user.projects}
          addProject={this.addProject}
          changeProject={this.changeProject}
          deleteProject={this.deleteProject}
          handleSelect={this.handleSelect}
        />
        <Project
          project={this.state.currentProject}
          addTask={this.addTask}
          updateTaskStatus={this.updateTaskStatus}
          deleteTask={this.deleteTask}
        />
      </AppGrid>
    )
  }
};

export default App;
