import React from 'react'

const NewBooking = () => {

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
    
    return(
        <form style={formStyles}>
        <div style={divStyles}>
                <label style={labelStyles}>name</label>
                <input style={inputStyles} required type='text' name='name' placeholder='name'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>surname</label>
                <input style={inputStyles} required type='text' name='surname' placeholder='surname'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>email</label>
                <input style={inputStyles} required type='text' name='eamil' placeholder='email'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>number_teeth</label>
                <input style={inputStyles} required type='text' name='number_teeth' placeholder='number of teeth'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>address_line_1</label>
                <input style={inputStyles} required type='text' name='address' placeholder='address'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>city</label>
                <input style={inputStyles} required type='text' name='city' placeholder='city'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>postcode</label>
                <input style={inputStyles} required type='text' name='postcode' placeholder='postcode'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>country</label>
                <input style={inputStyles} required type='text' name='country' placeholder='country'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>continent</label>
                <input style={inputStyles} required type='text' name='continent' placeholder='continent'></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>currency</label>
                <input style={inputStyles} required type='text' name='currency' placeholder='currency'></input>
            </div>
                <input style={inputStyles} type='submit' value='book now'></input>
        </form>
    )
}
export default NewBooking