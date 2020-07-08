import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom' 
// import NewBooking from './components/NewBooking'
import Bookings from './components/Bookings'
import Login from './components/Login'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import parentData from './data/parent_data'

const App = () => {
  const [bookings, setBookings] = useState([])
  useEffect(()=> {
    setBookings(parentData)
  }, [])



  return (
<div>
<h1>Welcome to Tooth Inc.</h1>
<Bookings parentData={bookings}/>

    <BrowserRouter>
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
      </div>
  )
}


export default App
