import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterUserScreen } from '../components/auth/RegisterUserScreen'

export const AuthRouter = () => {
    return (
        <Switch>
            <Route exact path="/auth/login" component={ LoginScreen }/>
            <Route exact path="/auth/register" component={ RegisterUserScreen }/>

            <Redirect to="/auth/login"/>
        </Switch>
    )
}
PublicRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
