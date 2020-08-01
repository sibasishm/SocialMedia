import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const GuestLinks = ({ signIn, register }) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <Button basic color="teal" content="Sign in" onClick={signIn} />
    </Menu.Item>
    <Menu.Item id="hide-sm">
      <Button color="teal" content="Get started" onClick={register} />
    </Menu.Item>
  </Menu.Menu>
);

export default GuestLinks;
