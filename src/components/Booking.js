import React from 'react'
import {Link} from 'react-router-dom'

const Booking = ({history, post, showControls, deleteBooking}) => {
    // If we don't have a post, return null.
    if (!post) return null

    const linkStyles = {
        textDecoration : 'none',
        color: 'black'
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    // console.log('showcontrols', showControls)
    function handleDelete (){
        deleteBooking(post._id)
        history.push('/')
    }


    const {modified_date, name, surname, email, number_teeth, address_line_1, city, postcode, country, continent, currency } = post
    return (
        <div>
        <Link style={linkStyles} to={`/posts/${post._id}`}>
            <h1>{name}</h1>
            </Link>
            <p>{modified_date.toLocaleString()}</p>
            <p>{surname}</p>
            <p>{email}</p>
            <p>{number_teeth}</p>
            <p>{address_line_1}</p>
            <p>{city}</p>
            <p>{postcode}</p>
            <p>{country}</p>
            <p>{continent}</p>
            <p>{currency}</p>
            {showControls && (
                    <div>
                        <Link to={`/booking/edit/${post._id}`}><button>Edit</button></Link>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    </div>
             )}
        </div>
    )
}


export default Booking

