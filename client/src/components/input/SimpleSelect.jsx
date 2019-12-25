import React from 'react';

export const SimpleSelect = ({
	input,
	label,
	iconClasses,
	placeholder,
	multiple = false,
	options = [],
	meta: { touched, error }
}) => (
	<div className={`form-group ${iconClasses ? 'icon-input' : ''}`}>
		{label && <label>{label}</label>}
		{iconClasses && <i className={iconClasses}></i>}
		<select {...input} multiple={multiple}>
			<option value='' disabled>
				{placeholder}
			</option>
			{options.map(val => (
				<option value={val} key={val}>
					{val}
				</option>
			))}
		</select>
		{touched && error && <span>{error}</span>}
	</div>
);
