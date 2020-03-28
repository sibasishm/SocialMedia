import React from 'react';
import { Segment, Header, Form, Button, List } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';
import Accordion from '../layout/Accordion';
import { DateInput } from '../input/DateInput';
import ListItem from '../layout/ListItem';

import { required } from '../../utils/formValidators';
import { formatDate } from '../../utils';

const clearAfterSubmit = (result, dispatch) => dispatch(reset('userEducation'));

const createContentForAccordion = payload =>
	payload.map(({ _id, school, degree, fieldOfStudy, from, to }) => ({
		title: school,
		body: (
			<List key={_id}>
				<ListItem
					iconName='building'
					title='School name'
					description={school}
				/>
				<ListItem
					iconName='graduation cap'
					title='Degree'
					description={degree}
				/>
				<ListItem
					iconName='book'
					title='Field of study'
					description={fieldOfStudy}
				/>
				<ListItem
					iconName='calendar'
					title='Date'
					description={`${formatDate(from)} - ${formatDate(to) ||
						'Now'}`}
				/>
			</List>
		)
	}));

const Education = ({
	pristine,
	submitting,
	handleSubmit,
	education,
	updateProfile
}) => (
	<Segment>
		<Header dividing size='large' content='Education background' />
		{education && (
			<Accordion content={createContentForAccordion(education)} />
		)}
		<Form
			style={{ marginTop: '1rem' }}
			onSubmit={handleSubmit(updateProfile)}
		>
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
	onSubmitSuccess: clearAfterSubmit
})(Education);
