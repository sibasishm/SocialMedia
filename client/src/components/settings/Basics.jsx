import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { RadioInput } from '../input/RadioInput';

import { required } from '../../utils/formValidators';

const Basics = ({ pristine, submitting, handleSubmit, updateProfile }) => (
	<Segment>
		<Header dividing size='large' content='Basic Information' />
		<Form onSubmit={handleSubmit(updateProfile)}>
			<Form.Group inline widths='equal'>
				<Field
					fluid
					name='firstName'
					type='text'
					component={SimpleInput}
					placeholder='First name'
					icon='user'
					validate={required}
				/>
				<Field
					fluid
					name='surname'
					type='text'
					component={SimpleInput}
					placeholder='Surname'
					icon='user'
				/>
			</Form.Group>
			<Form.Group inline>
				<label>Gender: </label>
				<Field
					name='gender'
					value='male'
					label='Male'
					type='radio'
					component={RadioInput}
				/>
				<Field
					name='gender'
					value='female'
					label='Female'
					type='radio'
					component={RadioInput}
				/>
				<Field
					name='gender'
					value='other'
					label='Other'
					type='radio'
					component={RadioInput}
				/>
			</Form.Group>
			<Field
				name='dob'
				type='date'
				component={SimpleInput}
				placeholder='Date of birth'
				icon='calendar'
				validate={required}
			/>
			<Field
				name='location'
				type='text'
				component={SimpleInput}
				placeholder='Home town'
				icon='map marker alternate'
			/>
			<Button
				disabled={pristine || submitting}
				size='large'
				positive
				content='Update'
			/>
		</Form>
	</Segment>
);

export default reduxForm({
	form: 'userBasics',
	enableReinitialize: true
})(Basics);
