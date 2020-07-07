import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom' 
import Form from './components/Form'
import Login from './components/Login'
import Logout from './components/Logout'
import NotFound from './components/NotFound'

const App = () => {
  



  return (
    <BrowserRouter>
    
     <h1>Welcome to Tooth Inc.</h1>
    
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
        <Switch>
        <Route exact path="/" render={Login} />
        <Route exact path='/logout' render={Logout} />
        <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
   
  )
}


export default App
