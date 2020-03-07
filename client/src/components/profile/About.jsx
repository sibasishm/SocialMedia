import React, { Fragment } from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { formatDate } from '../../utils';

export default ({
	profile: { dob, hobbies, location, topics, education, experience }
}) => (
	<Fragment>
		<Grid columns={2} relaxed='very' stackable>
			<Grid.Column>
				<Header size='medium'>Basic details</Header>
				<List>
					<List.Item>
						<List.Icon name='calendar' />
						<List.Content>{formatDate(dob)}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='map marker alternate' />
						<List.Content>{location}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='user' />
						<List.Content>{hobbies.join(', ')}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='user' />
						<List.Content>{topics.join(', ')}</List.Content>
					</List.Item>
				</List>
			</Grid.Column>
			<Grid.Column>
				<Header size='medium'>Contact Information</Header>
				<List>
					<List.Item>
						<List.Icon name='calendar' />
						<List.Content>{formatDate(dob)}</List.Content>
					</List.Item>
				</List>
			</Grid.Column>
		</Grid>
		<Grid columns={2} relaxed='very' stackable>
			<Grid.Column>
				<Header size='medium'>Education</Header>
				{education &&
					education.map(
						({ _id, school, degree, fieldOfStudy, from, to }) => (
							<List key={_id}>
								<List.Item>
									<List.Icon name='building' />
									<List.Content>
										<List.Header>School name</List.Header>
										<List.Description>
											{school}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='graduation cap' />
									<List.Content>
										<List.Header>Degree</List.Header>
										<List.Description>
											{degree}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='book' />
									<List.Content>
										<List.Header>
											Field of study
										</List.Header>
										<List.Description>
											{fieldOfStudy}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='calendar' />
									<List.Content>
										<List.Header>Date</List.Header>
										<List.Description>
											{`${formatDate(
												from
											)} - ${formatDate(to) || 'Now'}`}
										</List.Description>
									</List.Content>
								</List.Item>
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
								<List.Item>
									<List.Icon name='industry' />
									<List.Content>
										<List.Header>Company name</List.Header>
										<List.Description>
											{company}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='black tie' />
									<List.Content>
										<List.Header>Job title</List.Header>
										<List.Description>
											{title}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='book' />
									<List.Content>
										<List.Header>
											Roles & responsibility
										</List.Header>
										<List.Description>
											{description}
										</List.Description>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name='calendar' />
									<List.Content>
										<List.Header>Date</List.Header>
										<List.Description>
											{`${formatDate(
												from
											)} - ${formatDate(to) || 'Now'}`}
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						)
					)}
			</Grid.Column>
		</Grid>
	</Fragment>
);
