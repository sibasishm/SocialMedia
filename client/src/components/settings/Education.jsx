import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';

import { required } from '../../utils/formValidators';
import { DateInput } from '../input/DateInput';

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
			<Form.Group widths='equal'>
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
			<Form.Group widths='equal'>
				{/* <label>I am currently studing here: </label> */}
				<Field
					name='from'
					component={DateInput}
					placeholder='From'
					validate={required}
				/>
				<Field name='to' component={DateInput} placeholder='To' />
			</Form.Group>
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
