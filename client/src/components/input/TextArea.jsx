import React from 'react';

export const TextArea = ({
	input,
	label,
	iconClasses,
	placeholder,
	rows = 1,
	meta: { touched, error }
}) => (
	<div className={`form-group ${iconClasses ? 'icon-input' : ''}`}>
		{label && <label>{label}</label>}
		{iconClasses && <i className={iconClasses}></i>}
		<textarea {...input} placeholder={placeholder} rows={rows} />
		{touched && error && <span>{error}</span>}
	</div>
);
