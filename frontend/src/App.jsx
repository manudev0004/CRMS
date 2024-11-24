import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Resources from "./components/Resources";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CostManagement from "./components/CostManagement";
import CloudProviders from "./components/CloudProviders";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="flex">
          {/* <Sidebar /> Sidebar persists on all pages */}
          <div className="flex-1 p-6">
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/" exact component={HomePage} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password/:token" component={ResetPassword} />

              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/resources" component={Resources} />
              <PrivateRoute
                path="/cost-management"
                component={CostManagement}
              />
              <PrivateRoute
                path="/cloud-providers"
                component={CloudProviders}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
