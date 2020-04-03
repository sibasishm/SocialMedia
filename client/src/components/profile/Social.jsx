import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default ({ user = {} }) => {
	const socialMediaObject = (({
		facebook,
		instagram,
		twitter,
		linkedin,
		youtube
	}) => ({ facebook, instagram, twitter, linkedin, youtube }))(user);

	const socialMediaItems = Object.keys(socialMediaObject).filter(
		item => socialMediaObject[item]
	);

	return (
		socialMediaItems.length && (
			<Grid columns={socialMediaItems.length} relaxed='very'>
				{socialMediaItems.map((item, index) => (
					<Grid.Column key={index}>
						<Button
							circular
							color={item}
							icon={item}
							onClick={() =>
								window.open(
									`https://${item}.com/${socialMediaObject[item]}`,
									'_blank'
								)
							}
						/>
					</Grid.Column>
				))}
			</Grid>
		)
	);
};
