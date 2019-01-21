import React from 'react';
import styled from 'styled-components';
import {get, post, patch, remove} from '../helpers/utils';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import Project from './Project';

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1.9fr;
  grid-template-rows: 80px auto;
  grid-template-areas:
    'nav nav'
    'sidebar main';
  min-height: 100vh;
`;

class App extends React.Component {
  state = {
    user: {
      projects: [],
    },
    currentProject: {
      tasks: [],
    },
    labels: [],
  };

  async componentDidMount() {
    const user = await get('/api/users-current');
    if (!user._id) return this.props.history.push('/login');
    this.setState({
      user,
      currentProject: user.projects[0],
    });
    const projects = await get(`/api/users/${user._id}/projects`);
    user.projects = projects;
    this.setState({user});
    const labels = await get('/api/labels');
    this.setState({labels});
  }

  logout = async () => {
    const user = await get('/api/logout');
    if (user.loggedOut) {
      return this.props.history.push('/login');
    }
  };

  addTask = async title => {
    const task = await post(
      '/api/tasks',
      `title=${title}&projectId=${this.state.currentProject._id}`
    );
    const currentProject = {...this.state.currentProject};
    currentProject.tasks.push(task);
    this.setState({currentProject});
  };

  updateTaskStatus = async (taskId, status) => {
    const updatedTaskStatus = await patch(`/api/tasks/${taskId}`, status);
    const currentProject = {...this.state.currentProject};
    const indexOfUpdatedTask = currentProject.tasks.findIndex(
      task => task._id === taskId
    );
    currentProject.tasks = [
      ...currentProject.tasks.slice(0, indexOfUpdatedTask),
      updatedTaskStatus,
      ...currentProject.tasks.slice(indexOfUpdatedTask + 1),
    ];
    this.setState({currentProject});
  };

  editTask = async (taskId, updates) => {
    const updatedTask = await patch(`/api/tasks/${taskId}`, updates);
    const currentProject = {...this.state.currentProject};
    const indexOfUpdatedTask = currentProject.tasks.findIndex(
      task => task._id === taskId
    );
    currentProject.tasks = [
      ...currentProject.tasks.slice(0, indexOfUpdatedTask),
      updatedTask,
      ...currentProject.tasks.slice(indexOfUpdatedTask + 1),
    ];
    this.setState({currentProject});
  };

  deleteTask = async taskId => {
    await remove(`/api/tasks/${taskId}`);
    const currentProject = {...this.state.currentProject};
    const indexOfDeletedTask = currentProject.tasks.findIndex(
      task => task._id === taskId
    );
    currentProject.tasks = [
      ...currentProject.tasks.slice(0, indexOfDeletedTask),
      ...currentProject.tasks.slice(indexOfDeletedTask + 1),
    ];
    this.setState({currentProject});
  };

  addProject = async name => {
    const project = await post('/api/projects', `name=${name}`);
    const user = {...this.state.user};
    user.projects.push(project);
    this.setState({user});
  };

  updateUserStateWithProject = project => {
    const user = this.state.user;
    const indexOfProject = user.projects.findIndex(
      foundProject => foundProject._id === project._id
    );
    user.projects = [
      ...user.projects.slice(0, indexOfProject),
      project,
      ...user.projects.slice(indexOfProject + 1),
    ];
    this.setState({user});
  };

  changeProject = async project => {
    const currentProject = this.state.currentProject;
    if (currentProject.type === 'label') {
      const refreshedProject = await get(`/api/projects/${project._id}`);
      this.updateUserStateWithProject(refreshedProject);
      this.setState({currentProject: refreshedProject});
    } else {
      this.updateUserStateWithProject(currentProject);
      this.setState({currentProject: project});
    }
  };

  editProject = async (projectId, updates) => {
    const updatedProject = await patch(`/api/projects/${projectId}`, updates);
    const user = {...this.state.user};
    const indexOfUpdatedProject = user.projects.findIndex(
      project => project._id === projectId
    );
    user.projects = [
      ...user.projects.slice(0, indexOfUpdatedProject),
      updatedProject,
      ...user.projects.slice(indexOfUpdatedProject + 1),
    ];
    const currentProject =
      this.state.currentProject._id === updatedProject._id
        ? updatedProject
        : this.state.currentProject;
    this.setState({user, currentProject});
  };

  deleteProject = async projectId => {
    await remove(`/api/projects/${projectId}`);
    const user = {...this.state.user};
    const indexOfDeletedProject = user.projects.findIndex(
      project => project._id === projectId
    );
    user.projects = [
      ...user.projects.slice(0, indexOfDeletedProject),
      ...user.projects.slice(indexOfDeletedProject + 1),
    ];
    this.setState({user});
    if (this.state.currentProject._id === projectId) {
      const project =
        this.state.user.projects.length > 0
          ? this.state.user.projects[0]
          : null;
      this.setState({currentProject: project});
    }
  };

  addLabel = async title => {
    const label = await post('/api/labels', `title=${title}`);
    const labels = [...this.state.labels];
    labels.push(label);
    this.setState({labels});
  };

  changeLabel = label => {
    const currentProject = this.state.currentProject;
    if (currentProject.type !== 'label')
      this.updateUserStateWithProject(currentProject);
    const labelAsProject = {
      name: label.title,
      _id: label._id,
      tasks: [],
      type: 'label',
    };
    this.setState({currentProject: labelAsProject});
  };

  editLabel = async (labelId, updates) => {
    const updatedLabel = await patch(`/api/labels/${labelId}`, updates);
    let labels = [...this.state.labels];
    const indexOfUpdatedLabel = labels.findIndex(
      label => label._id === labelId
    );
    labels = [
      ...labels.slice(0, indexOfUpdatedLabel),
      updatedLabel,
      ...labels.slice(indexOfUpdatedLabel + 1),
    ];
    this.setState({labels});
  };

  deleteLabel = async labelId => {
    await remove(`/api/labels/${labelId}`);
    let labels = [...this.state.labels];
    const indexOfDeletedLabel = labels.findIndex(
      label => label._id === labelId
    );
    labels = [
      ...labels.slice(0, indexOfDeletedLabel),
      ...labels.slice(indexOfDeletedLabel + 1),
    ];
    this.setState({labels});
    if (this.state.currentProject._id === labelId) {
      const project =
        this.state.user.projects.length > 0
          ? this.state.user.projects[0]
          : null;
      this.setState({currentProject: project});
    }
  };

  render() {
    return (
      <AppGrid>
        <Navigation name={this.state.user.name} logout={this.logout} />
        <Sidebar
          user={this.state.user}
          projects={this.state.user.projects}
          changeProject={this.changeProject}
          addProject={this.addProject}
          editProject={this.editProject}
          deleteProject={this.deleteProject}
          labels={this.state.labels}
          changeLabel={this.changeLabel}
          addLabel={this.addLabel}
          editLabel={this.editLabel}
          deleteLabel={this.deleteLabel}
        />
        <Project
          project={this.state.currentProject}
          addTask={this.addTask}
          editTask={this.editTask}
          updateTaskStatus={this.updateTaskStatus}
          deleteTask={this.deleteTask}
        />
      </AppGrid>
    );
  }
}

export default App;
