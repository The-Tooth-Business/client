import React from 'react'
import {Link} from 'react-router-dom'


const Nav = () => {
const divStyles = {
    display: 'flex',
    flexDirection: 'column'
}

const linkStyles={
    fontSize: '1.2em',
    textDecoration: 'none',
    margin: '.5em',
    color: 'black'
}

    return (   
    <div styles={divStyles}>
    <h1>Welcome to Tooth Inc.</h1>
        <Link style={linkStyles} to='/'>Home</Link>
        <Link style={linkStyles} to="/logout">Logout</Link>
        <Link style={linkStyles} to='/booking/new'>Add a booking</Link>
        <Link style={linkStyles} to="/bookings">Bookings</Link>
    </div>
    )

}

export default Nav