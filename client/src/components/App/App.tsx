import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Home } from "../../pages/Home";
import { meAction } from "../../redux/auth/actions";
import { Register } from "../../pages/Register";
import { useTypedSelector } from "../../redux/hooks";
import { Loading } from "../Loading";
import { AuthRoute } from "../AuthRoute/AuthRoute";
import { Profile } from "../../pages/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Settings } from "../../pages/Settings";

export const App = () => {
  const dispatch = useDispatch();

  const didRequest = useTypedSelector((state) => state.auth.didRequest);

  useEffect(() => {
    dispatch(meAction());
  }, [dispatch]);

  if (!didRequest) {
    return <Loading />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute exact path="/register">
          <Register />
        </AuthRoute>
        <ProtectedRoute exact path="/profile/:username">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/settings/:action">
          <Settings />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};
