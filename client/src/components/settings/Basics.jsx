import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { RadioInput } from '../input/RadioInput';

import { required } from '../../utils/formValidators';
import { DateInput } from '../input/DateInput';

const Basics = ({ pristine, submitting, handleSubmit, updateProfile }) => (
	<Segment>
		<Header dividing size='large' content='Basic information' />
		<Form onSubmit={handleSubmit(updateProfile)}>
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
				component={DateInput}
				placeholder='Date of birth'
				peekNextMonth
				showMonthDropdown
				showYearDropdown
				dropdownMode='scroll'
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
