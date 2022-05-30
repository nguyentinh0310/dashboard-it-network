import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import ListPage from "./pages/ListPage";

export default function UserFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={ListPage} exact />

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:userId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
