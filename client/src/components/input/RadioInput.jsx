import React from 'react';
import { Form } from 'semantic-ui-react';

export const RadioInput = ({ input, label, type }) => (
	<Form.Field>
		<span className='ui radio'>
			<input {...input} type={type} /> <label>{label}</label>
		</span>
	</Form.Field>
);
