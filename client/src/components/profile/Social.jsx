import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default () => {
	return (
		<Grid columns={3} relaxed='very'>
			<Grid.Column>
				<Button circular color='facebook' icon='facebook' />
			</Grid.Column>
			<Grid.Column>
				<Button circular color='instagram' icon='instagram' />
			</Grid.Column>
			<Grid.Column>
				<Button circular color='twitter' icon='twitter' />
			</Grid.Column>
		</Grid>
	);
};
