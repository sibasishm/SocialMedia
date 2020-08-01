import React from 'react';
import { Grid } from 'semantic-ui-react';

export default ({ followers }) => {
  return (
    <Grid columns={2} textAlign="center">
      <Grid.Column>
        <p className="name">{(followers && followers.length) || 0}</p>
        <p className="info">Followers</p>
      </Grid.Column>
      <Grid.Column>
        <p className="name">0</p>
        <p className="info">Posts</p>
      </Grid.Column>
    </Grid>
  );
};
