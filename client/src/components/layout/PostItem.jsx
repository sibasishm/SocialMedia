import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default ({ post: { name, avatar, text, date, likes, comments } }) => (
	<Card>
		<Card.Content>
			<Image src={avatar} floated='left' size='mini' />

			<Card.Header>{name}</Card.Header>
			<Card.Meta>Posted on: {date}</Card.Meta>
			<Card.Description>{text}</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<div className='ui two buttons'>
				<Button basic color='green'>
					Likes({likes.length})
				</Button>
				<Button basic color='red'>
					Comments({comments.length})
				</Button>
			</div>
		</Card.Content>
	</Card>
);
