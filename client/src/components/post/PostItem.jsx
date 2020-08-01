import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { formatDate } from '../../utils';

export default ({
  post: { _id, user, content, date, reactions, comments },
  showButtons = true
}) => (
  <Card fluid>
    <Card.Content>
      <Image src={user.avatar} floated="left" size="mini" />
      <Card.Header as={Link} to={`/users/${user._id}`} content={user.firstName} />
      <Card.Meta>Posted on: {formatDate(date)}</Card.Meta>
      <Card.Description>{content}</Card.Description>
    </Card.Content>
    {showButtons && (
      <Card.Content extra>
        {/* {isAuthenticated ? (
					<div className='ui three buttons'>
						<Button
							basic
							color='green'
							onClick={() => addLike(_id)}
						>
							Likes({likes.length})
						</Button>
						<Button
							id='hide-sm'
							as={Link}
							to={`/posts/${_id}`}
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
				) : ( */}
        <Button as={Link} to={`/posts/${_id}`} color="teal" floated="right">
          View
        </Button>
      </Card.Content>
    )}
  </Card>
);
