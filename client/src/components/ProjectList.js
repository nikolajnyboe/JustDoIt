import React from 'react';
import styled from 'styled-components';
import {Listing, Button, DeleteButton} from './SubComponents';

const Grid = styled.div`
  grid-area: list;
  padding-left: 15px;
`;

const List = styled.ul`
  padding: 0;
`;

const ProjectTitle = styled.p`
  font-weight: bold;
  display: inline-block;
  margin: 0;

  :hover {
    color: #0074D9;
  }
`;

class ProjectList extends React.Component {
  name = React.createRef();

  addProject = event => {
    event.preventDefault();
    const name = this.name.current.value;
    this.props.addProject(name);
  };

  editProject = id => {
    console.log(id);
  }

  render() {
    return (
      <Grid>
        <h2>Project List</h2>
        <form onSubmit={this.addProject}>
          <h3>Add Project:</h3>
          <input required name="name" type="text" placeholder="Project Name" ref={this.name} />
          <button type="submit">Add Project</button>
        </form>
        <List>
          {this.props.projects.map(project => (
            <Listing key={project._id}>
              <ProjectTitle onClick={() => this.props.changeProject(project)}>{project.name}</ProjectTitle>
              <Button type="button" onClick={() => this.editProject(project._id)}>Edit</Button>
              <DeleteButton type="button" onClick={() => this.props.deleteProject(project._id)}>Delete</DeleteButton>
            </Listing>
          ))}
        </List>
      </Grid>
    )
  }

};

export default ProjectList;