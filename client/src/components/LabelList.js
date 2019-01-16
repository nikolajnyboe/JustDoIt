import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton, Input} from './SubComponents';
import EditLabelForm from './EditLabelForm';

const Container = styled.div`
  grid-area: labellist;
`;

const Title = styled.h2`
  display: inline-block;
  margin-right: 20px;
`;

const List = styled.ul`
  padding: 0;
`;

const LabelTitle = styled.p`
  display: inline-block;
  margin: 0;
  margin-top: 10px;
  margin-right: auto;
  color: #0074D9;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s ease;

  :hover {
    color: #0f518a;
  }
`;

class LabelList extends React.Component {
  state = {
    showNewLabel: false,
    editLabel: null
  }

  title = React.createRef();

  addLabel = event => {
    event.preventDefault();
    const title = this.title.current.value;
    this.props.addLabel(title);
    this.setState({showNewLabel: false});
  }

  setEditState = id => {
    this.setState({editLabel: id});
  }

  resetEditState = () => {
    this.setState({editLabel: null});
  }

  render() {
    return(
      <Container>
        <Title>Labels</Title>
        <Button type="button" onClick={() => this.setState({showNewLabel: !this.state.showNewLabel})}>New</Button>
        {!this.state.showNewLabel ? null : (
          <form onSubmit={this.addLabel}>
            <Input required name="title" type="text" placeholder="Label Title" ref={this.title} />
            <Button type="submit">Save</Button>
          </form>
        )}
        <List>
          {this.props.labels.map(label => (
            this.state.editLabel === label._id ? (
              <EditLabelForm
                key={label._id}
                label={label}
                editLabel={this.props.editLabel}
                resetEditState={this.resetEditState}
              />
              ) : (
              <Listing key={label._id}>
                <LabelTitle onClick={() => this.props.changeLabel(label)}>{label.title}</LabelTitle>
                <Button type="button" onClick={() => this.setEditState(label._id)}>Edit</Button>
                <DeleteButton type="button" onClick={() => this.props.deleteLabel(label._id)}>Delete</DeleteButton>
              </Listing>
            )
          ))}
        </List>
      </Container>
    )
  }
};

export default LabelList;



/* class ProjectList extends React.Component {
  state = {
    showNewProject: false,
    editProject: null
  }

  name = React.createRef();
  selectedProject = React.createRef();

  addProject = event => {
    event.preventDefault();
    const name = this.name.current.value;
    this.props.addProject(name);
    this.setState({showNewProject: false});
  };

  setEditState = id => {
    this.setState({editProject: id});
  }

  resetEditState = () => {
    this.setState({editProject: null});
  }

  render() {
    return (
      <Container>
        <Title>Projects</Title>
        <Button type="button" onClick={() => this.setState({showNewProject: !this.state.showNewProject})}>New</Button>
        {!this.state.showNewProject ? null : (
          <form onSubmit={this.addProject}>
            <Input required name="name" type="text" placeholder="Project Name" ref={this.name} />
            <Button type="submit">Save</Button>
          </form>
        )}
        <List>
          {this.props.projects.map(project => (
            this.state.editProject === project._id ? (
              <EditProjectForm
                key={project._id}
                project={project}
                editProject={this.props.editProject}
                resetEditState={this.resetEditState}
              />
              ) : (
              <ProjectListing key={project._id}>
                {project.collaborators.length > 0 ? (
                  <Shared><span role='img' aria-label='Shared project'>👥 {project.collaborators.length}</span></Shared>
                ) : null}
                <ProjectTitle onClick={() => this.props.changeProject(project)}>{project.name}</ProjectTitle>
                <Button type="button" onClick={() => this.setEditState(project._id)}>Edit</Button>
                <DeleteButton type="button" onClick={() => this.props.deleteProject(project._id)}>Delete</DeleteButton>
              </ProjectListing>
            )
          ))}
        </List>
      </Container>
    )
  }

}; */