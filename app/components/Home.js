// @flow
import React from 'react';
import ProseEditor from './ProseEditor';
import CheckpointForm from './Forms/CheckpointForm';

const Home = () => (
  <div>
    <ProseEditor />
    <CheckpointForm
      onSubmit={({ commitMessage }) =>
        console.log('Submitted new checkpoint: ', commitMessage)
      }
    />
  </div>
);

export default Home;
