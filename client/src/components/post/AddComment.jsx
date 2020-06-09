import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { Form, Button } from 'semantic-ui-react';

import { TextArea } from '../input/TextArea';

import { addAComment } from '../../apis/posts';

const AddComment = ({ postId }) => {
	const [text, setText] = useState('');
	const [addComment] = useMutation((text) => addAComment(text, postId), {
		// onMutate: text => {
		// 	queryCache.cancelQueries(['post', postId]);

		// 	const previousPostContent = queryCache.getQueryData(['post', postId]);

		// 	queryCache.setQueryData(['post', postId], old => {
		// 		console.log('old', old)
		// 	});

		// 	return previousPostContent;
		// },
		onSuccess: () => {
			setText('');
		},
		onError: (err) => console.log(err),
		onSettled: () => queryCache.refetchQueries(['post', postId]),
	});

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				addComment(text);
			}}
		>
			<textarea value={text} onChange={(e) => setText(e.target.value)} />
			<Button
				content='Add reply'
				labelPosition='left'
				icon='edit'
				primary
			/>
		</Form>
	);
};

export default AddComment;
