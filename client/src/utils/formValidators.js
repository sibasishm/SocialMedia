export const required = value =>
	value || typeof value === 'number' ? undefined : 'Required';

const maxLength = max => value =>
	value && value.length > max
		? `Must be ${max} characters or less`
		: undefined;
export const maxLength15 = maxLength(15);

const minLength = min => value =>
	value && value.length < min
		? `Must be ${min} characters or more`
		: undefined;
export const minLength8 = minLength(8);

export const minLength20 = minLength(20);

export const number = value =>
	value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;

export const tooYoung = value =>
	value && value < 15
		? 'You do not meet the minimum age requirement!'
		: undefined;

export const notGmail = value =>
	value && !/.+@gmail\.com/.test(value)
		? 'Really? You still use this for your email?'
		: undefined;

export const alphaNumeric = value =>
	value && /[^a-zA-Z0-9 ]/i.test(value)
		? 'Only alphanumeric characters'
		: undefined;

export const phoneNumber = value =>
	value && !/^(0|[1-9][0-9]{9})$/i.test(value)
		? 'Invalid phone number, must be 10 digits'
		: undefined;

export const matchPasswords = (value, allValues) =>
	value !== allValues.password ? 'Passwords must match' : undefined;

// ^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$

export const strongPassword = value =>
	value &&
	!/^([A-Z]{1,})([a-z]{1,})([0-9]{1,})([!@#$&*.-_%]{1,})$/.test(value)
		? 'Please choose a stronger password'
		: undefined;
