import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Form, Button } from 'semantic-ui-react';

import { TextArea } from '../input/TextArea';

const AddComment = ({
	pristine,
	submitting,
	handleSubmit,
	addComment,
	postId,
}) => {
	return (
		<Form
			onSubmit={handleSubmit((formData) => addComment(postId, formData))}
		>
			<Field
				name='text'
				component={TextArea}
				placeholder='Leave a comment'
				rows={3}
			/>
			<Button
				disabled={pristine || submitting}
				content='Add reply'
				labelPosition='left'
				icon='edit'
				primary
			/>
		</Form>
	);
};

export default AddComment;
