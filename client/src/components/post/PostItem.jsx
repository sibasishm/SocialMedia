import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';

export default ({
	post: { _id, name, user, avatar, text, date, likes, comments },
	addLike,
	deletePost,
	isAuthenticated,
	showButtons = true
}) => (
	<Card fluid>
		<Card.Content>
			<Image src={avatar} floated='left' size='mini' />
			<Card.Header as={Link} to={`/people/${user}`} content={name} />
			<Card.Meta>Posted on: {date}</Card.Meta>
			<Card.Description>{text}</Card.Description>
		</Card.Content>
		{showButtons && (
			<Card.Content extra>
				{isAuthenticated ? (
					<div className='ui three buttons'>
						<Button
							basic
							color='green'
							onClick={() => addLike(_id)}
						>
							Likes({likes.length})
						</Button>
						<Button
							as={Link}
							to={`/topics/${_id}`}
							basic
							color='teal'
						>
							Comments({comments.length})
						</Button>
						<Button
							basic
							color='red'
							onClick={() => deletePost(_id)}
						>
							Delete
						</Button>
					</div>
				) : (
					<Button
						as={Link}
						to={`/topics/${_id}`}
						color='teal'
						floated='right'
					>
						View
					</Button>
				)}
			</Card.Content>
		)}
	</Card>
);
