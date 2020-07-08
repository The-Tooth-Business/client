import React from 'react'

const NewBooking = () => {

    return(
        <form>
        <div>
                <label>name</label>
                <input required type='text' name='name' placeholder='name'></input>
            </div>
            <div>
                <label>surname</label>
                <input required type='text' name='surname' placeholder='surname'></input>
            </div>
            <div>
                <label>email</label>
                <input required type='text' name='eamil' placeholder='email'></input>
            </div>
            <div>
                <label>number_teeth</label>
                <input required type='text' name='number_teeth' placeholder='number of teeth'></input>
            </div>
            <div>
                <label>address_line_1</label>
                <input required type='text' name='address' placeholder='address'></input>
            </div>
            <div>
                <label>city</label>
                <input required type='text' name='city' placeholder='city'></input>
            </div>
            <div>
                <label>postcode</label>
                <input required type='text' name='postcode' placeholder='postcode'></input>
            </div>
            <div>
                <label>country</label>
                <input required type='text' name='country' placeholder='country'></input>
            </div>
            <div>
                <label>continent</label>
                <input required type='text' name='continent' placeholder='continent'></input>
            </div>
            <div>
                <label>currency</label>
                <input required type='text' name='currency' placeholder='currency'></input>
            </div>
                <input type='submit' value='book now'></input>
        </form>
    )
}
export default NewBooking