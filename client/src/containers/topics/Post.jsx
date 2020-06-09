import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';
import Comments from '../../components/post/Comments';

import { addComment, deleteComment } from '../../actions/post';
import { getAPost } from '../../apis/posts';

const Post = ({ addComment, deleteComment, match }) => {
	const postId = match.params.id;
	const { status, data, error } = useQuery(['post', postId], getAPost);

	console.log(data, error);
	if (status === 'loading') return <Spinner />;
	if (status === 'error') return <p>Error: {error.message}</p>;
	return (
		<Segment>
			<Button
				as={Link}
				to='/posts'
				color='teal'
				content='View all posts'
			/>
			<PostItem showButtons={false} post={data.data} />
			<Comments
				comments={data.data.comments}
				addComment={addComment}
				deleteComment={deleteComment}
				postId={postId}
			/>
		</Segment>
	);
};

Post.propTypes = {
	addComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment, deleteComment })(Post);
