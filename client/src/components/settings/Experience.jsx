import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';

import { required } from '../../utils/formValidators';

const clearAfterSubmit = (result, dispatch) =>
	dispatch(reset('userExperience'));

const Experience = ({ pristine, submitting, handleSubmit, updateProfile }) => (
	<Segment>
		<Header dividing size='large' content='Education background' />
		<Form onSubmit={handleSubmit(updateProfile)}>
			<Form.Group inline widths='equal'>
				<Field
					fluid
					name='title'
					type='text'
					component={SimpleInput}
					placeholder='Job title'
					icon='black tie'
					validate={required}
				/>
				<Field
					fluid
					name='company'
					type='text'
					component={SimpleInput}
					placeholder='Company Name'
					icon='industry'
					validate={required}
				/>
			</Form.Group>
			{/* <Form.Group inline> */}
			{/* <label>I am currently studing here: </label> */}
			<Field
				// fluid
				name='from'
				type='date'
				component={SimpleInput}
				placeholder='From'
				icon='calendar'
				validate={required}
			/>
			<Field
				// fluid
				name='to'
				type='date'
				component={SimpleInput}
				placeholder='To'
				icon='calendar'
			/>
			{/* </Form.Group> */}
			<label>Add some details</label>
			<Field
				name='description'
				rows={3}
				component={TextArea}
				placeholder='Description'
			/>
			<Button
				disabled={pristine || submitting}
				size='large'
				positive
				content='Add Experience'
			/>
		</Form>
	</Segment>
);

export default reduxForm({
	form: 'userExperience',
	// enableReinitialize: true,
	onSubmitSuccess: clearAfterSubmit
})(Experience);
