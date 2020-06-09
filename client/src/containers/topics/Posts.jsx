import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';
import CreatePost from '../../components/post/CreatePost';

import { addLike, deletePost, addPost } from '../../actions/post';

import { getAllPosts, getMyPosts } from '../../apis/posts';

const Posts = ({ isAuthenticated = false, addLike, deletePost, addPost }) => {
	const { status, data, error } = useQuery(
		'posts',
		isAuthenticated ? getMyPosts : getAllPosts
	);

	if (status === 'loading') return <Spinner />;
	if (status === 'error') return <p>Error: {error.message}</p>;
	return (
		<Fragment>
			{isAuthenticated && <CreatePost addPost={addPost} />}
			<Card.Group itemsPerRow={1}>
				{data.data.map((post) => (
					<PostItem
						key={post.id}
						post={post}
						addLike={addLike}
						deletePost={deletePost}
						isAuthenticated={isAuthenticated}
					/>
				))}
			</Card.Group>
		</Fragment>
	);
};

Posts.propTypes = {
	isAuthenticated: PropTypes.bool,
	addLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	addPost: PropTypes.func.isRequired,
};

export default connect(null, {
	addLike,
	deletePost,
	addPost,
})(Posts);
