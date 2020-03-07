import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';

import { getPost, addComment, deleteComment } from '../../actions/post';
import Comments from '../../components/post/Comments';
import List from '../../components/layout/List';

const Post = ({
	post: { current, loading },
	getPost,
	addComment,
	deleteComment,
	match
}) => {
	const postId = match.params.id;
	useEffect(() => {
		getPost(postId);
	}, [getPost, postId]);

	return loading || current === null ? (
		<Spinner />
	) : (
		<Segment>
			<Button
				as={Link}
				to='/topics'
				color='teal'
				content='View all posts'
			/>
			<PostItem showButtons={false} post={current} />
			{/* <List /> */}
			<Comments
				comments={current.comments}
				addComment={addComment}
				deleteComment={deleteComment}
				postId={postId}
			/>
		</Segment>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
	Post
);
