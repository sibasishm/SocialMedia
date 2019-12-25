import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const NotFound = () => (
	<Container text>
		<Header
			as='h1'
			content='Page Not Found!'
			subheader="Sorry, this page doesn't exist."
		/>
	</Container>
);

export default NotFound;
