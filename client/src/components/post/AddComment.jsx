import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { Form, Button } from 'semantic-ui-react';

import { TextArea } from '../input/TextArea';

import { addAComment } from '../../apis/posts';

const AddComment = ({ postId }) => {
	const [text, setText] = useState('');
	const [addComment] = useMutation(addAComment, {
		// onMutate: text => {
		// 	queryCache.cancelQueries(['post', postId]);

		// 	const previousPostContent = queryCache.getQueryData(['post', postId]);

		// 	queryCache.setQueryData(['post', postId], old => {
		// 		console.log('old', old)
		// 	});

		// 	return previousPostContent;
		// },
		onSuccess: (data) => {
			setText('');
			queryCache.setQueryData(['post', postId], (old) => {
				console.log(data);
				return {
					status: old.status,
					data: {
						...old.data,
						comments: [...old.data.comments, data.data.data],
					},
				};
			});
		},
		onError: (err) => console.log(err),
		// onSettled: () => queryCache.refetchQueries(['post', postId]),
	});

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				addComment({ text, postId });
			}}
		>
			<textarea value={text} onChange={(e) => setText(e.target.value)} />
			<Button
				disabled={!Boolean(text)}
				content='Add reply'
				labelPosition='left'
				icon='edit'
				primary
			/>
		</Form>
	);
};

export default AddComment;
