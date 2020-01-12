import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export const TextArea = ({
	input,
	rows,
	placeholder,
	meta: { touched, error, warning }
}) => (
	<Form.Field error={touched && !!error}>
		<textarea
			{...input}
			rows={rows}
			placeholder={placeholder}
			style={{ minHeight: 50 }}
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
