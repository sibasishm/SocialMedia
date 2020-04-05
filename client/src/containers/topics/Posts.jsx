import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';
import CreatePost from '../../components/post/CreatePost';

import {
	getPosts,
	getMyPosts,
	addLike,
	deletePost,
	addPost
} from '../../actions/post';

const Posts = ({
	isAuthenticated = false,
	getPosts,
	getMyPosts,
	addLike,
	deletePost,
	addPost,
	post: { all, mine, loading }
}) => {
	const effect = isAuthenticated ? getMyPosts : getPosts;
	const payload = isAuthenticated ? mine : all;
	useEffect(() => {
		effect();
	}, [effect]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			{isAuthenticated && <CreatePost addPost={addPost} />}
			<Card.Group itemsPerRow={1}>
				{payload &&
					payload.map((post, index) => (
						<PostItem
							key={index}
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
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	getMyPosts: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, {
	getPosts,
	getMyPosts,
	addLike,
	deletePost,
	addPost
})(Posts);
