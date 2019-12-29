import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default ({
	profile: {
		user: { name, avatar },
		bio,
		location
	}
}) => (
	<Card>
		<Image src={avatar} wrapped ui={false} />
		<Card.Content>
			<Card.Header>{name}</Card.Header>
			<Card.Meta>{location && `From ${location}`}</Card.Meta>
			<Card.Description>{bio}</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<p>Extra Info...</p>
		</Card.Content>
	</Card>
);
