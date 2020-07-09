import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom' 
import parentData from './data/parent_data'
import Nav from './components/Nav'
import Bookings from './components/Bookings'
import Booking from './components/Booking'
import NewBooking from './components/NewBooking'
import EditBooking from './components/EditBooking'
import Login from './components/Login'
import Logout from './components/Logout'
import Success from './components/Success'
import NotFound from './components/NotFound'



const App = () => {
  const [bookings, setBookings] = useState([])
  useEffect(()=> {
    setBookings(parentData)
  }, [])

function getBookingFromId (id) {
  const post = bookings.find((post) => post._id === parseInt(id))
  return post
 // return bookings.find((post) => post._id === parseInt(id))
}

function addBooking(post) {
  setBookings([...bookings,post])
}

function getNextId(){
  const ids = bookings.map((post) => post._id)
  return ids.sort()[ids.length - 1] +1 
}

function deleteBooking(id){
  const otherBookings = bookings.filter((post) => post._id !== parseInt(id))
  setBookings(otherBookings)
}

function updateBooking(updatedBooking){
  const otherBookings = bookings.filter((post) => post._id !==  updatedBooking._id)
  setBookings([...otherBookings, updatedBooking])
}
  return (
<div>

    <BrowserRouter>
      <Nav />
        <Switch>
          <Route exact path='/' render={Login} />
          <Route exact path='/logout' render={Logout} />
          <Route exact path='/success' render={Success} />
          <Route exact path='/bookings' render={(props) => <Bookings {...props} parentData={bookings} />}/>
          <Route exact path='/posts/:id' render={(props) => 
          <Booking {...props} post={getBookingFromId(props.match.params.id)} showControls deleteBooking={deleteBooking} />}/>
          <Route exact path='/booking/new' render={(props)=> 
          <NewBooking {...props} addBooking={addBooking} nextId={getNextId()} /> } />
          <Route exact path='/booking/edit/:id' render={(props) => <EditBooking {...props} updateBooking={updateBooking} post={getBookingFromId(props.match.params.id)}/> } />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
  </div>
  )
}


export default App
