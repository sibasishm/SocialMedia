import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

export const SimpleInput = ({
	input,
	type,
	label,
	icon,
	placeholder,
	meta: { touched, error, warning }
}) => (
	<Form.Field error={touched && !!error}>
		<Input
			{...input}
			fluid
			type={type}
			icon={icon}
			iconPosition='left'
			label={label}
			labelPosition='left'
			placeholder={placeholder}
		/>
		{touched &&
			((error && (
				<Label basic pointing color='red'>
					{error}
				</Label>
			)) ||
				(warning && (
					<Label basic pointing color='orange'>
						{warning}
					</Label>
				)))}
	</Form.Field>
);
