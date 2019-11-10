import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () =>
    <header className="landing">
        <div className="landing-inner">
            <h1 className="landing-inner-text">
                <span className="x-large">
                    Socialize
                </span>
                <span className="lead">
                    Rest of the world is just a click away
                </span>
            </h1>
            <Link to="/register" className="btn btn-light my-1">Get started</Link>
        </div>
    </header>


export default Landing
