import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default ({ userId }) => {
  return (
    <Menu attached="top" tabular>
      <Menu.Item as={NavLink} exact to={`/users/${userId}`}>
        Activities
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/users/${userId}/about`}>
        About
      </Menu.Item>
    </Menu>
  );
};
