import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const DateInput = ({ input, placeholder, meta: { touched, error }, ...rest }) => (
  <Form.Field error={touched && !!error}>
    <DatePicker
      dateFormat="dd MMM yyyy"
      maxDate={new Date()}
      placeholderText={placeholder}
      selected={input.value ? new Date(input.value) : null}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onChangeRaw={(e) => e.preventDefault()}
      {...rest}
    />
    {touched && error && (
      <Label basic pointing color="red">
        {error}
      </Label>
    )}
  </Form.Field>
);
