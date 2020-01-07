import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default () => {
	return (
		<Grid>
			<Grid.Column width={5}>
				<Button circular color='facebook' icon='facebook' />
			</Grid.Column>
			<Grid.Column width={5}>
				<Button circular color='instagram' icon='instagram' />
			</Grid.Column>
			<Grid.Column width={5}>
				<Button circular color='twitter' icon='twitter' />
			</Grid.Column>
		</Grid>
	);
};
