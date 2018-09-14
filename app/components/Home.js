// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CheckpointForm from './Forms/CheckpointForm';

import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>

        <CheckpointForm
          onSubmit={({ commitMessage }) =>
            console.log('Submitted new checkpoint: ', commitMessage)
          }
        />
      </div>
    );
  }
}
