import React from 'react';
import styled from 'styled-components';
import {Listing, Input, Button, DeleteButton} from './SubComponents';

const EditForm = styled.form`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
`;

class EditLabelForm extends React.Component {
  state = {
    title: '',
  };

  componentDidMount() {
    this.setState({
      title: this.props.label.title,
    });
  }

  saveLabel = event => {
    event.preventDefault();
    const updatedLabel = {
      title: this.state.title,
    };
    this.props.editLabel(this.props.label._id, updatedLabel);
    this.props.resetEditState();
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <Listing>
        <EditForm onSubmit={this.saveLabel}>
          <Container>
            <Input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              placeholder='Label title'
            />
            <SaveButton type='submit'>Save</SaveButton>
            <DeleteButton
              marginLeft
              type='button'
              onClick={this.props.resetEditState}
            >
              Cancel
            </DeleteButton>
          </Container>
        </EditForm>
      </Listing>
    );
  }
}

export default EditLabelForm;
