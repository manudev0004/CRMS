import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Resources from "./components/Resources";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/" component={HomePage} />
        </Switch>
        <Feature />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
