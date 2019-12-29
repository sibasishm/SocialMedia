import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/post';
import Spinner from '../../components/layout/Spinner';
import { Card } from 'semantic-ui-react';
import PostItem from '../../components/layout/PostItem';

const Topics = ({ getPosts, post: { all, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return loading ? (
		<Spinner />
	) : (
		<Card.Group itemsPerRow={2}>
			{all &&
				all.map((post, index) => <PostItem key={index} post={post} />)}
		</Card.Group>
	);
};

Topics.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Topics);
