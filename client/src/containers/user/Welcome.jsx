import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Welcome = ({ user = {} }) => {
  return (
    <div>
      <h1>{`Welcome, ${user.firstName || ''}!`}</h1>
      <p>Please set up your profile. A whole new spectrum of awesomeness awaits your arrival.</p>
      {/* <ol>
				<li>Add basic details to confirm that you're not a ghost.</li>
				<li>
					Upload a profile picture, ghosts are not allowed beyond this
					point.
				</li>
				<li>
					Add your social presence details and show us you're a social
					animal.
				</li>
				<li>
					Get out of your shell, find new friends, start a discussion
					thread.
				</li>
			</ol> */}
      <Button as={Link} to="/settings" color="teal" content="Go to settings" />
    </div>
  );
};

export default Welcome;
