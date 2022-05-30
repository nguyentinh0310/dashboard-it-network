import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { AdminLayout, NotFound, PrivateRoute } from "./components";
import LoginPage from "./features/auth/LoginPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to="/admin" exact />
        <Route path="/login" component={LoginPage}  />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
