import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ isAuthentiated, component: Component, ...rest }) => {
    return (
       <Route { ...rest } 
            component={ (props) => (
                (isAuthentiated)
                    ? (<Component {...props}/>)
                    : (<Redirect to="/login" />)
            )}
       />
    )
}

PrivateRoute.propTypes = {
    isAuthentiated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
