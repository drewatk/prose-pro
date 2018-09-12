// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import ProseEditor from './ProseEditor';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <ProseEditor />
      </div>
    );
  }
}
