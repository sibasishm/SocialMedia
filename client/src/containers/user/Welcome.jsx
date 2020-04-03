import React from 'react';
// import PropTypes from 'prop-types';

const Welcome = props => {
	return (
		<div>
			<h1>We are so glad to have you on borad!</h1>
			<p>
				Please set up your profile. A whole new spectrum of awesomeness
				awaits your arrival.
			</p>
			<ol>
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
			</ol>
		</div>
	);
};

// Welcome.propTypes = {};

export default Welcome;
