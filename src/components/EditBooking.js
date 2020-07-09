import React, { useState, useEffect }from 'react'
// import {withRouter} from 'react-router-dom'

const EditBooking = ({history, updateBooking, post}) => {

    const divStyles = {
        display: 'grid',
        width: '100vw',
        padding: '1em'
    }

    const inputStyles = {
        width: '50vw',
        height: '2em',
        margin: '1em',
    }

    const labelStyles = {
        fontSize: '1.5em',
    }

    //state
const initialFormState = {
    name: '',
    surname: '',
    email :'',
    number_teeth: '',
    address: '',
    city : '',
    postcode: '',
    country: '',
    continent: '',
    currency: ''
}
const [formState, setFormState] = useState(initialFormState)
useEffect(() =>{
    post && setFormState({
        name: post.name,
        surname: post.surname,
        email : post.email,
        number_teeth: post.number_teeth,
        address: post.address,
        city : post.city,
        postcode: post.city,
        country: post.country,
        continent: post.continent,
        currency: post.currency
    })
}, [post])

function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    setFormState({...formState, [name]: value })
}

function handleSubmit(event){
    event.preventDefault()
    const updatedBooking = {
        _id: post._id,
        name: formState.name,
        surname: formState.surname,
        email : formState.email,
        number_teeth: formState.number_teeth,
        address: formState.address,
        city : formState.city,
        postcode: formState.postcode,
        country: formState.country,
        continent: formState.continent,
        currency: formState.currency,
        modified_date: new Date()
    }
    updateBooking(updatedBooking) 
    // history.push(`/posts/${nextId}`)
    history.push('/bookings')
    
}
    
    return(
        <form onSubmit={handleSubmit}>
        <div style={divStyles}>
                <label style={labelStyles}>name</label>
                <input style={inputStyles} required type='text' name='name' value={formState.name} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>surname</label>
                <input style={inputStyles} required type='text' name='surname' value={formState.surname} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>email</label>
                <input style={inputStyles} required type='text' name='eamil' value={formState.email} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>number_teeth</label>
                <input style={inputStyles} required type='text' name='number_teeth' value={formState.number_teeth} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>address</label>
                <input style={inputStyles} required type='text' name='address' value={formState.address} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>city</label>
                <input style={inputStyles} required type='text' name='city' value={formState.city} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>postcode</label>
                <input style={inputStyles} required type='text' name='postcode' value={formState.postcode} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>country</label>
                <input style={inputStyles} required type='text' name='country' value={formState.country} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>continent</label>
                <input style={inputStyles} required type='text' name='continent' value={formState.continent} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>currency</label>
                <input style={inputStyles} required type='text' name='currency' value={formState.currency} onChange={handleChange}></input>
            </div>
                <input style={inputStyles} type='submit' value='update booking'></input>
        </form>
    )
}
export default EditBooking