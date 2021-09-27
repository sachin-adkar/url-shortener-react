import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Home } from "./components/Home";
import { Callback } from "./components/Callback";
import { Login } from "./components/Login";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route component={Login} exact path="/login" />
                <Route component={Callback} path="/callback" />
                <Route exact path="/" render={() => {
                    if (!localStorage.getItem('accessToken')) {
                        return <Redirect to='/login' />
                    }
                    return <Home />

                }} />
            </Switch>
        </Router>
    );
}
