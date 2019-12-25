import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

export const SimpleInput = ({
	input,
	type,
	label,
	icon,
	placeholder,
	meta: { touched, error }
}) => (
	<Form.Field error={touched && !!error}>
		<Input
			{...input}
			type={type}
			icon={icon}
			iconPosition='left'
			label={label}
			labelPosition='left'
			placeholder={placeholder}
		/>
		{touched && !!error && (
			<Label pointing color='red'>
				{error}
			</Label>
		)}
	</Form.Field>
);
