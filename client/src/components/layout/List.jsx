import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default () => (
	<List horizontal ordered={false} size='tiny'>
		<List.Item>
			<Image
				avatar
				src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
			/>
			<List.Content>
				<List.Header>Tom</List.Header>
				Top Contributor
			</List.Content>
		</List.Item>
		<List.Item>
			<Image
				avatar
				src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'
			/>
			<List.Content>
				<List.Header>Christian Rocha</List.Header>
				Admin
			</List.Content>
		</List.Item>
		<List.Item>
			<Image
				avatar
				src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
			/>
			<List.Content>
				<List.Header>Matt</List.Header>
				Top Rated User
			</List.Content>
		</List.Item>
	</List>
);
