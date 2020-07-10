import React, { useState }from 'react'
import {withRouter} from 'react-router-dom'

const NewBooking = ({history, addBooking, nextId}) => {

    const formStyles ={
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        border : '1px solid lightgrey',
        padding: '10px'
        
    }

    const divStyles = {
        display: 'grid',
        width: '100vw',
      
    }

    const inputStyles = {
        width: '40vw',
        height: '2em',
        margin: '1em',

        
    }

    const labelStyles = {
        fontSize: '1.2em',
        
      
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

function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    setFormState({...formState, [name]: value })
}

function handleSubmit(event){
    event.preventDefault()
    const newPost = {
        _id: nextId,
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
    addBooking(newPost) 
    // history.push(`/posts/${nextId}`)
    history.push('/success')
    
}
    
    return(
<<<<<<< HEAD
        <form styles={formStyles} onSubmit={handleSubmit}>
=======

        
        <form style={formStyles} onSubmit={handleSubmit}>

>>>>>>> master
        <div style={divStyles}>
                <label style={labelStyles}>name</label>
                <input style={inputStyles} required type='text' name='name' placeholder='name' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>surname</label>
                <input style={inputStyles} required type='text' name='surname' placeholder='surname' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>email</label>
                <input style={inputStyles} required type='text' name='eamil' placeholder='email' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>number_teeth</label>
                <input style={inputStyles} required type='text' name='number_teeth' placeholder='number of teeth' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>address</label>
                <input style={inputStyles} required type='text' name='address' placeholder='address' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>city</label>
                <input style={inputStyles} required type='text' name='city' placeholder='city' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>postcode</label>
                <input style={inputStyles} required type='text' name='postcode' placeholder='postcode' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>country</label>
                <input style={inputStyles} required type='text' name='country' placeholder='country' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>continent</label>
                <input style={inputStyles} required type='text' name='continent' placeholder='continent' onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>currency</label>
                <input style={inputStyles} required type='text' name='currency' placeholder='currency' onChange={handleChange}></input>
            </div>
                <input style={inputStyles} type='submit' value='book now'></input>
                
        </form>
    )
}
export default withRouter (NewBooking)