import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import TransportDetails from './Components/TransportDetails/TransportDetails';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     <Router>
      <Header></Header>
      <h3 className="loginEmail">{loggedInUser.email}</h3>
      <Switch>
       <Route path="/home">
         <Home></Home>
       </Route>
       <Route exact path="/">
         <Home></Home>
       </Route>
       <Route exact path="/login">
         <Login></Login>
       </Route>
       <Route path="/signup">
         <Signup></Signup>
       </Route>
       <PrivateRoute path="/:id">
        <TransportDetails></TransportDetails>
       </PrivateRoute>
      </Switch>
    </Router>
    </UserContext.Provider>
    
  );
}

export default App;
