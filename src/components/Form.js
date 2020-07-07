import React from 'react'

const Form = (props) => {
    const {name, surname, email, phone, address} = props
    const sectionStyles = {
        display: "grid",
        width: "50vw",
        gridTemplateColumns: "1fr 1fr",
        padding: ".5em"
    }
    const headingStyles = {
        color: "gray"
    }
    const itemStyles = {
        marginRight: "1em",
        marginBottom: ".5em",
        width: "25vw"
    }
    const hrStyles = {
        color: "gray",
        width: "50vw",
        margin: "0"
    }

    function onPersonalDetailsChange(event) {
        props.onChangePersonal(event.target.name, event.target.value)
    }

    function onAddressChange(event) {
        props.onChangeAddress(event.target.name, event.target.value)
    }

    return (
        <form >
            <div style={headingStyles}>PERSONAL DETAILS</div>
            <hr style={hrStyles} />
            <div style={sectionStyles}>

                <div style={itemStyles}>
                    <div>
                        <label>GIVEN NAME</label>
                    </div>
                    <div>
                        <input name="name" type="text" value={name} onChange={onPersonalDetailsChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>SURNAME</label>
                    </div>
                    <div>
                        <input name="surname" type="text" value={surname} onChange={onPersonalDetailsChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>EMAIL</label>
                    </div>
                    <div>
                        <input name="email" type="email" value={email} onChange={onPersonalDetailsChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>PHONE</label>
                    </div>
                    <div>
                        <input name="phone" type="phone" value={phone} onChange={onPersonalDetailsChange} />
                    </div>
                </div>
            </div>
            <div style={headingStyles}>ADDRESS</div>
            <hr style={hrStyles} />
            <div style={sectionStyles}>
                <div style={itemStyles}>
                    <div>
                        <label>HOUSE NAME OR #</label>
                    </div>
                    <div>
                        <input name="number" type="text" value={address.number} onChange={onAddressChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>STREET</label>
                    </div>
                    <div>
                        <input name="street" type="text" value={address.street} onChange={onAddressChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>SUBURB</label>
                    </div>
                    <div>
                        <input name="suburb" type="text" value={address.suburb} onChange={onAddressChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>STATE</label>
                    </div>
                    <div>
                        <input name="state" type="text" value={address.state} onChange={onAddressChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>POSTCODE</label>
                    </div>
                    <div>
                        <input name="postcode" type="text" value={address.postcode} onChange={onAddressChange} />
                    </div>
                </div>
                <div style={itemStyles}>
                    <div>
                        <label>COUNTRY</label>
                    </div>
                    <div>
                        <input name="country" type="text" value={address.country} onChange={onAddressChange} />
                    </div>
                    </div>
                    <div style={itemStyles}>
                    <div>
                        <label>CONTINENT</label>
                    </div>
                    <div>
                        <input name="continent" type="text" value={address.continent} onChange={onAddressChange} />
                    </div>
                </div>
            </div>
        </form>

    )
}

export default Form;