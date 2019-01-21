import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton, Input} from './SubComponents';
import EditProjectForm from './EditProjectForm';

const Container = styled.div`
  grid-area: projectlist;
`;

const Title = styled.h2`
  display: inline-block;
  margin-right: 20px;
`;

const List = styled.ul`
  padding: 0;
`;

const ProjectListing = styled(Listing)`
  position: relative;
`;

const ProjectTitle = styled.p`
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

const Shared = styled.span`
  position: absolute;
  top: -15px;
`;

const SharedNumber = styled.span`
  font-weight: 600;
  font-size: 85%;
  vertical-align: super;
`;

class ProjectList extends React.Component {
  state = {
    showNewProject: false,
    editProject: null
  }

  name = React.createRef();

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
                  <Shared><span role='img' aria-label='Shared project'>👥</span><SharedNumber>{project.collaborators.length}</SharedNumber></Shared>
                ) : null}
                <ProjectTitle onClick={() => this.props.changeProject(project)}>{project.name}</ProjectTitle>
                {this.props.user._id !== project.owner._id ? null : (
                  <>
                    <Button type="button" onClick={() => this.setEditState(project._id)}>Edit</Button>
                    <DeleteButton marginLeft type="button" onClick={() => this.props.deleteProject(project._id)}>Delete</DeleteButton>
                  </>
                )}
              </ProjectListing>
            )
          ))}
        </List>
      </Container>
    )
  }

};

export default ProjectList;