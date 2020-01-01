import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';

export default ({
	post: { _id, name, avatar, text, date, likes, user, comments },
	auth,
	addLike
}) => (
	<Card>
		<Card.Content>
			<Image src={avatar} floated='left' size='mini' />
			<Card.Header>{name}</Card.Header>
			<Card.Meta>Posted on: {date}</Card.Meta>
			<Card.Description>{text}</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<div className='ui two buttons'>
				<Button basic color='green' onClick={() => addLike(_id)}>
					Likes({likes.length})
				</Button>
				<Button as={Link} to={`/topics/${_id}`} basic color='teal'>
					Comments({comments.length})
				</Button>
			</div>
		</Card.Content>
	</Card>
);
