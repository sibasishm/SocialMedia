import React from 'react';
import { Grid } from 'semantic-ui-react';

export default () => {
	return (
		<Grid>
			<Grid.Column width={5} textAlign='center'>
				<p className='name' style={{ fontSize: '1.5rem' }}>
					1,663
				</p>
				<p className='info'>Connections</p>
			</Grid.Column>
			<Grid.Column width={5} textAlign='center'>
				<p className='name' style={{ fontSize: '1.5rem' }}>
					13
				</p>
				<p className='info'>Events</p>
			</Grid.Column>
			<Grid.Column width={5} textAlign='center'>
				<p className='name' style={{ fontSize: '1.5rem' }}>
					933
				</p>
				<p className='info'>Discussions</p>
			</Grid.Column>
		</Grid>
	);
};
