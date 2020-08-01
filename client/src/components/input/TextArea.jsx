import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export const TextArea = ({ error, rows, placeholder, ...rest }) => (
	<Form.Field error={!!error}>
		<textarea
			{...rest}
			rows={rows}
			placeholder={placeholder}
			style={{ minHeight: 50 }}
		/>
		{error && (
			<Label basic pointing color='red'>
				{error}
			</Label>
		)}
	</Form.Field>
);
