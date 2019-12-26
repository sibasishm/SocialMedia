import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';

const Profile = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 class='large text-primary'>Profile</h1>
			<p class='lead'>Welcome {user && user.name}</p>
			<div class='Profile-buttons'></div>
			<h2 class='my-2'>Experience Credentials</h2>
			<table class='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th class='hide-sm'>Year</th>
						<th class='hide-sm'>Title</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>UNICEF</td>
						<td class='hide-sm'>Oct 2012 - Current</td>
						<td class='hide-sm'>Human Right Activist</td>
						<td>
							<button class='btn btn-danger'>
								<i class='fas fa-times'></i>
							</button>
						</td>
					</tr>
					<tr>
						<td>World Bank</td>
						<td class='hide-sm'>Jul 2009 - Jul 2012</td>
						<td class='hide-sm'>Human Right Activist</td>
						<td>
							<button class='btn btn-danger'>
								<i class='fas fa-times'></i>
							</button>
						</td>
					</tr>
					<tr>
						<td>World Health Organisation (WHO)</td>
						<td class='hide-sm'>Oct 2005 - May 2009</td>
						<td class='hide-sm'>Human Right Activist</td>
						<td>
							<button class='btn btn-danger'>
								<i class='fas fa-times'></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class='my-1'>
				<a href='add-experience.html' class='btn btn-success'>
					<i class='fab fa-black-tie'></i> Add Experinece
				</a>
			</div>
			<h2 class='my-2'>Education Credentials</h2>
			<table class='table'>
				<thead>
					<tr>
						<th>School</th>
						<th class='hide-sm'>Year</th>
						<th class='hide-sm'>Degree</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Oxford University</td>
						<td class='hide-sm'>Jun 2000 - Apr 2004</td>
						<td class='hide-sm'>
							Masters of Business Administration
						</td>
						<td>
							<button class='btn btn-danger'>
								<i class='fas fa-times'></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class='my-1'>
				<a href='add-education.html' class='btn btn-success'>
					<i class='fas fa-graduation-cap'></i> Add Education
				</a>
			</div>
		</Fragment>
	);
};

Profile.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
