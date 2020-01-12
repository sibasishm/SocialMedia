import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default () => {
	return (
		<Menu attached='top' tabular>
			<Menu.Item as={NavLink} exact to='/me'>
				Activities
			</Menu.Item>
			<Menu.Item as={NavLink} to='/me/about'>
				About
			</Menu.Item>
			<Menu.Item as={NavLink} to='/me/network'>
				Network
			</Menu.Item>
			<Menu.Item as={NavLink} to='/me/topics'>
				Topics
			</Menu.Item>
			{/* <Menu.Item as={NavLink} to='/me/events'>
				Events
			</Menu.Item> */}
			<Menu.Item as={NavLink} to='/me/photos'>
				Photos
			</Menu.Item>
		</Menu>
	);
};
