import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';

import { required } from '../../utils/formValidators';

const clearAfterSubmit = (result, dispatch) => dispatch(reset('userEducation'));

const Education = ({ pristine, submitting, handleSubmit, updateProfile }) => (
	<Segment>
		<Header dividing size='large' content='Education background' />
		<Form onSubmit={handleSubmit(updateProfile)}>
			<Field
				name='school'
				type='text'
				component={SimpleInput}
				placeholder='School/College name'
				icon='building'
				validate={required}
			/>
			<Form.Group inline widths='equal'>
				<Field
					fluid
					name='degree'
					type='text'
					component={SimpleInput}
					placeholder='Degree'
					icon='graduation cap'
				/>
				<Field
					fluid
					name='fieldOfStudy'
					type='text'
					component={SimpleInput}
					placeholder='Field of study'
					icon='book'
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
				content='Add Education'
			/>
		</Form>
	</Segment>
);

export default reduxForm({
	form: 'userEducation',
	// enableReinitialize: true,
	onSubmitSuccess: clearAfterSubmit
})(Education);
