import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default ({ isRegister }) => {
  return (
    <div>
      <Button fluid color="facebook">
        <Icon name="facebook" />
        {`${isRegister ? 'Register' : 'Sign in'} with Facebook`}
      </Button>
      <Button fluid color="google plus" style={{ marginTop: '0.75rem' }}>
        <Icon name="google plus" />
        {`${isRegister ? 'Register' : 'Sign in'} with Google`}
      </Button>
    </div>
  );
};
