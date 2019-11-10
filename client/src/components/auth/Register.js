import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFormSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Passowrds don't match!", "danger");
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="mt-1">
            <h1 className="large text-primary">Register</h1>
            <p className="lead">Create your account. Can't wait to see you on board.</p>
            <form className="form" onSubmit={e => onFormSubmit(e)}>
                <div className="form-group icon-input">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder="Your Name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={e => onInputChange(e)}
                        required
                    />
                </div>
                <div className="form-group icon-input">
                    <i className="fas fa-envelope"></i>
                    <input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => onInputChange(e)}
                        required
                    />
                </div>
                <div className="form-group icon-input">
                    <i className="fas fa-unlock"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => onInputChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group icon-input">
                    <i className="fas fa-unlock-alt"></i>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={e => onInputChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
            <p className="my-1">
                <Link to="/login">I am already a member</Link>
            </p>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {
        setAlert,
        register
    }
)(Register);
