import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

export default () => {
	return (
		<Menu attached='top' tabular>
			<Menu.Item as={NavLink} exact to='/people/:id'>
				Activities
			</Menu.Item>
			<Menu.Item as={NavLink} to='/people/:id/about'>
				About
			</Menu.Item>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Button content='Follow' color='teal' />
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};
