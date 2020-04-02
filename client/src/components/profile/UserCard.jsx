import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

export default ({
	profile: {
		user: { firstName, avatar, _id },
		bio,
		location
	}
}) => (
	<Card>
		<Image src={avatar} wrapped ui={false} />
		<Card.Content>
			<Card.Header
				as={Link}
				to={`/people/${_id}`}
				content={`${firstName}`}
			/>
			<Card.Meta>{location && `From ${location}`}</Card.Meta>
			<Card.Description>{bio}</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<p>Extra Info...</p>
		</Card.Content>
	</Card>
);
