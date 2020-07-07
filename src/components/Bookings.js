import React from 'react'

const Bookings = ({post}) => {
    // If we don't have a post, return null.
    if (!post) return null

    const {name, number_teeth } = post
    return (
        <div>
            <h1>{name}</h1>
            <p>{number_teeth}</p>
        </div>
    )
}

export default Bookings