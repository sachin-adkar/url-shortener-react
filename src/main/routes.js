import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "../components/home";
import Shorten from "../components/shorten";
import Callback from "../components/callback";

export default function (props)
{
    console.log(props);
    return (
        <Router>
            <Switch>
                <Route component = {Home} exact path="/" />
                <Route component = {Callback} path="/callback" />
                <Route component = {Shorten} exact path="/shorten"/>
            </Switch>
        </Router>
    );
}
