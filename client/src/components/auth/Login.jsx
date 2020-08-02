import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/core';

import {login} from '../../actions/auth';

const Login = ({login}) => {
  const {register, handleSubmit, errors, formState} = useForm();
  return (
    <form onSubmit={handleSubmit(login)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          ref={register()}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          ref={register()}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Sign in
      </Button>
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, {login})(Login);
