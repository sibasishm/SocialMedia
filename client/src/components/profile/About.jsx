import React, { Fragment } from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { formatDate } from '../../utils';
import ListItem from '../layout/ListItem';

export default ({
	profile: { dob, hobbies, location, education, experience }
}) => (
	<Fragment>
		<Grid columns={2} relaxed='very' stackable>
			<Grid.Column>
				<Header size='medium'>Basic details</Header>
				<List>
					<ListItem
						iconName='calendar'
						description={formatDate(dob)}
					/>
					<ListItem
						iconName='map marker alternate'
						description={location}
					/>
					<ListItem
						iconName='user'
						description={hobbies.join(', ')}
					/>
				</List>
			</Grid.Column>
			<Grid.Column>
				<Header size='medium'>Contact Information</Header>
				<p>Coming soon...</p>
			</Grid.Column>
		</Grid>
		<Grid columns={2} relaxed='very' stackable>
			<Grid.Column>
				<Header size='medium'>Education</Header>
				{education &&
					education.map(
						({ _id, school, degree, fieldOfStudy, from, to }) => (
							<List key={_id}>
								<ListItem
									iconName='building'
									title='School name'
									description={school}
								/>
								<ListItem
									iconName='graduation cap'
									title='Degree'
									description={degree}
								/>
								<ListItem
									iconName='book'
									title='Field of study'
									description={fieldOfStudy}
								/>
								<ListItem
									iconName='calendar'
									title='Date'
									description={`${formatDate(
										from
									)} - ${formatDate(to) || 'Now'}`}
								/>
							</List>
						)
					)}
			</Grid.Column>
			<Grid.Column>
				<Header size='medium'>Experience</Header>
				{experience &&
					experience.map(
						({ _id, title, company, description, from, to }) => (
							<List key={_id}>
								<ListItem
									iconName='industry'
									title='Company name'
									description={company}
								/>
								<ListItem
									iconName='black tie'
									title='Job title'
									description={title}
								/>
								<ListItem
									iconName='book'
									title='Roles & responsibility'
									description={description}
								/>
								<ListItem
									iconName='calendar'
									title='Date'
									description={`${formatDate(
										from
									)} - ${formatDate(to) || 'Now'}`}
								/>
							</List>
						)
					)}
			</Grid.Column>
		</Grid>
	</Fragment>
);
