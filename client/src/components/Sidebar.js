import React from 'react';
import styled from 'styled-components';
import ProjectList from './ProjectList';
import LabelList from './LabelList';

const Grid = styled.div`
  grid-area: sidebar;
  padding: 0 20px;
  margin-bottom: 20px;
  border-right: 1px solid rgba(82, 95, 127, 0.2);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "projectlist"
    "labellist";
`;

class Sidebar extends React.Component {
  render() {
    return(
      <Grid>
        <ProjectList
          projects={this.props.projects}
          changeProject={this.props.changeProject}
          addProject={this.props.addProject}
          editProject={this.props.editProject}
          deleteProject={this.props.deleteProject}
        />
        <LabelList
          labels={this.props.labels}
          changeLabel={this.props.changeLabel}
          addLabel={this.props.addLabel}
          editLabel={this.props.editLabel}
          deleteLabel={this.props.deleteLabel}
        />
      </Grid>
    )
  }
};

export default Sidebar;