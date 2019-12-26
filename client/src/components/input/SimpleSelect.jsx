import React from 'react';
import { Form, Dropdown, Label } from 'semantic-ui-react';

const formatOptions = options =>
	options.map((option, index) => ({
		key: index,
		text: option,
		value: option.toLowerCase()
	}));

export const SimpleSelect = ({
	input,
	options,
	placeholder,
	multiple,
	meta: { touched, error, warning }
}) => (
	<Form.Field error={touched && !!error}>
		<Dropdown
			selection
			value={input.value || null}
			onChange={(e, data) => input.onChange(data.value)}
			multiple={multiple}
			placeholder={placeholder}
			options={formatOptions(options)}
			search
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
