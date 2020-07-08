import React from 'react'


const Booking = ({post}) => {
    // If we don't have a post, return null.
    if (!post) return null

    const {modified_date, name, surname, email, number_teeth, address_line_1, city, postcode, country, continent, currency } = post
    return (

        <div>
            <p>{modified_date.toLocaleString()}</p>
            <p>{name}</p>
            <p>{surname}</p>
            <p>{email}</p>
            <p>{number_teeth}</p>
            <p>{address_line_1}</p>
            <p>{city}</p>
            <p>{postcode}</p>
            <p>{country}</p>
            <p>{continent}</p>
            <p>{currency}</p>
        </div>
    )
}


export default Booking

// import React from 'react'
// import CardTitle from './CardTitle'

// const Booking = (props) => {
//     const {name, surname, email, address} = props
//     const {number, street, suburb, state, postcode, country, continent} = address 
//     const cardStyles = {
//         width: '40vw'
//     }
//     const sectionStyles = {
//         display: 'grid',
//         gridTemplateColumns: '1fr 2fr',
//         color: "darkgray",
//         marginTop: ".5em"
//     }
//     const valueStyles = {
//         color: "black",
//         marginLeft: ".5em"
//     }
//     const countryStyles = {
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr"
//     }

//     const hrStyles = {
//         color: "gray",
//         margin: "0",
//         width: "40vw"
//     }
//     return (
//         <div style={cardStyles}>
//             <CardTitle name={`${name} ${surname}`} />
//             <div style={sectionStyles}>
//                 <div>EMAIL</div>
//                 <div style={valueStyles}>{email}</div>
//             </div>
//             <hr style={hrStyles} />
//             <div style={sectionStyles}>
//                 <div>ADDRESS</div>
//                 <div style={valueStyles}>{`${number} ${street} ${suburb} ${state}`}</div>
//             </div>
//             <hr style={hrStyles} />
//             <div style={countryStyles}>
//                 <div style={sectionStyles}>
//                     <div>POSTCODE</div>
//                     <div style={valueStyles}>{postcode}</div>
//                 </div>
//                 <div style={sectionStyles}>
//                     <div>COUNTRY</div>
//                     <div style={valueStyles}>{country}</div>
//                 </div>
//                 <div style={sectionStyles}>
//                     <div>CONTINENT</div>
//                     <div style={valueStyles}>{continent}</div>
//                 </div>
//             </div>
//             <hr style={hrStyles} />
//         </div>
//     )
    
// }

// export default Booking


