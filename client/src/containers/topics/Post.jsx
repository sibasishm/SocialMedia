import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';
import Comments from '../../components/post/Comments';

import { getAPost } from '../../apis/posts';

const Post = ({ match }) => {
	const postId = match.params.id;
	const { status, data, error } = useQuery(['post', postId], getAPost);

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
			<Comments comments={data.data.comments} postId={postId} />
		</Segment>
	);
};

export default Post;
