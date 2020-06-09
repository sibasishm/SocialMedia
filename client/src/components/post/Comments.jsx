import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import AddComment from './AddComment';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

export default ({ postId, comments }) => (
	<Comment.Group minimal style={{ maxWidth: '100%' }}>
		<Header size='small' dividing>
			Comments
		</Header>
		{comments && comments.length > 0 ? (
			comments.map(({ _id, user, name, avatar, text, date }) => (
				<Comment key={_id} style={{ marginBottom: '1rem' }}>
					<Comment.Avatar src={avatar} />
					<Comment.Content>
						<Comment.Author as={Link} to={`/users/${user}`}>
							{name}
						</Comment.Author>
						<Comment.Metadata>{formatDate(date)}</Comment.Metadata>
						<Comment.Text>{text}</Comment.Text>
						<Comment.Actions>
							<Comment.Action>Reply</Comment.Action>
							{/* <Comment.Action
								onClick={() => deleteComment(postId, _id)}
							>
								Remove
							</Comment.Action> */}
						</Comment.Actions>
					</Comment.Content>
				</Comment>
			))
		) : (
			<Header size='tiny'>
				There are no comments for this post yet.
			</Header>
		)}
		<AddComment postId={postId} />
	</Comment.Group>
);
