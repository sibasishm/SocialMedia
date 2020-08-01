import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { formatDate } from '../../utils';

export default ({ user: { firstName, avatar, _id, date } }) => (
  <Card>
    <Image src={avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header as={Link} to={`/users/${_id}`} content={`${firstName}`} />
      <Card.Meta>{`Member since ${formatDate(date)}`}</Card.Meta>
      {/* <Card.Description>{bio}</Card.Description> */}
    </Card.Content>
  </Card>
);
