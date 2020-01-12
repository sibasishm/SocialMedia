import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

import { TextArea } from '../input/TextArea';

const clearAfterSubmit = (result, dispatch) => dispatch(reset('addComment'));

const AddComment = ({
	pristine,
	submitting,
	handleSubmit,
	addComment,
	postId
}) => (
	<Form onSubmit={handleSubmit(formData => addComment(postId, formData))}>
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

export default reduxForm({
	form: 'addComment',
	onSubmitSuccess: clearAfterSubmit
})(AddComment);
