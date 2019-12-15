import React from 'react';

export const SimpleInput = ({
	input,
	label,
	iconClasses,
	type,
	placeholder,
	meta: { touched, error }
}) => (
	<div className={`form-group ${iconClasses ? 'icon-input' : ''}`}>
		{label && <label>{label}</label>}
		{iconClasses && <i className={iconClasses}></i>}
		<input {...input} placeholder={placeholder} type={type} />
		{touched && error && <span>{error}</span>}
	</div>
);
