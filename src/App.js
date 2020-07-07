import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import Login from './components/Login'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div >
    <h1>Welcome to Tooth Inc.</h1>
      <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
