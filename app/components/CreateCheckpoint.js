import React, { Component } from 'react';

import { Button, Input } from './Basic';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    width: '350px',
    backgroundColor: '#fff',
    borderWidth: '1px',
    borderColor: '#000',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  button: {
    marginTop: '20px',
    width: '60px'
  }
};

/* I don't really want this to be a separate component in the file structure.
   It should be written as a separate component direcly inside the file that uses it */
class CreateCheckpoint extends Component {
  constructor(props) {
    super(props);
    this.state = { commitMessage: '' };
  }

  handleTextChange(e) {
    this.setState({ commitMessage: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.commitMessage);
  }

  render() {
    return (
      <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        {/* Set both button and input to disabled if no file changes have been saved. */}
        <h4>Create Checkpoint</h4>
        <label>Checkpoint Message (required)</label>
        <Input
          value={this.state.commitMessage}
          onChange={this.handleTextChange.bind(this)}
        />
        <Button type="submit" text="Create" style={styles.button} />
      </form>
    );
  }
}

export default CreateCheckpoint;
