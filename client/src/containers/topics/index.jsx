import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts, addLike } from '../../actions/post';
import Spinner from '../../components/layout/Spinner';
import { Card } from 'semantic-ui-react';
import PostItem from '../../components/layout/PostItem';

const Topics = ({ getPosts, addLike, post: { all, loading }, auth }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<Spinner />
	) : (
		<Card.Group itemsPerRow={2}>
			{all &&
				all.map((post, index) => (
					<PostItem
						key={index}
						post={post}
						auth={auth}
						addLike={addLike}
					/>
				))}
		</Card.Group>
	);
};

Topics.propTypes = {
	getPosts: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPosts, addLike })(Topics);
