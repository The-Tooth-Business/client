import React from 'react'
import Booking from './Booking'



const Bookings = ({parentData}) => {
    return (
        <div>
            {parentData.sort((a,b) => b.modified_date - a.modified_date).map((post) => <Booking key={post._id} post={post} />)}  
        </div>

    )


}

export default Bookings