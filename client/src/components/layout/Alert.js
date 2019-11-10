import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) =>
    alerts !== null && alerts.length > 0 && alerts.map(({ id, msg, alertType }) =>
        <div key={id} className={`alert alert-${alertType}`}>
            {msg}
        </div>
    );

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
