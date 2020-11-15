import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoute'
import { UpdateScreen } from '../components/update/UpdateScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../actions/authActions';


export const AppRoutes = () => {

    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    return (
        <div>
            <Router>
                <div>
                    <Switch>

                        <PrivateRoute exact path="/" component={UpdateScreen} isAuthentiated={!!uid} />
                        <PublicRoutes path="/auth" component={AuthRouter} isAuthenticated={!!uid} />

                        <Redirect to="/auth" />

                    </Switch>
                </div>
            </Router>
        </div>
    )
}
