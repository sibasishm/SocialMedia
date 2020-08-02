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

import {signup} from '../../actions/auth';

const Register = ({signup}) => {
  const {register, handleSubmit, errors, formState} = useForm();
  return (
    <form onSubmit={handleSubmit(register)}>
      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          name="firstName"
          type="firstName"
          placeholder="John"
          ref={register()}
        />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          name="lastName"
          type="lastName"
          placeholder="Doe"
          ref={register()}
        />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="jdoe@email.com"
          ref={register()}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="********"
          ref={register()}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          type="confirmPassword"
          placeholder="********"
          ref={register()}
        />
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Sign up
      </Button>
    </form>
  );
};

Register.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, {
  signup,
})(Register);
