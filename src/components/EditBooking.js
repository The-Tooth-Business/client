import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { updateBooking } from '../services/bookingsServices'

const EditBooking = ({ history, match }) => {
	const { store, dispatch } = useGlobalState();
	const { bookings } = store;
	const bookingId = match.params.id;
console.log(bookingId)
const booking = bookings.find((booking) => booking._id === bookingId);

	const divStyles = {
		display: 'grid',
		width: '100vw',
		padding: '1em',
	};

	const inputStyles = {
		width: '50vw',
		height: '2em',
		margin: '1em',
	};

	const labelStyles = {
		fontSize: '1.5em',
	};
	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({
			...formState,
			[name]: value,
		});
	}

	function handleSubmit(event) {
        event.preventDefault();
        const updatedBooking = {
            _id: booking._id,
            child_name: formState.child_name,
            teeth: formState.teeth,
            address: formState.address,
            city: formState.city,
            postcode: formState.postcode,
            country: formState.country,
            continent: formState.continent,
            currency: formState.currency,
        };
        updateBooking(updatedBooking).then(() => {
            const otherBookings = bookings.filter(
                (booking) => booking._id !== updatedBooking._id
            );
            dispatch({
                type: 'setBookings',
                data: [updatedBooking, ...otherBookings],
            });
        });

        history.push(`/bookings/${booking._id}`);
        
    }


	//state
	const initialFormState = {
		child_name: '',
		teeth: '',
		address: '',
		city: '',
		postcode: '',
		country: '',
		continent: '',
		currency: '',
	};

	const [formState, setFormState] = useState(initialFormState);

	useEffect(() => {
		booking &&
			setFormState({
				child_name: booking.child_name,
				teeth: booking.teeth,
				address: booking.address,
				city: booking.city,
				postcode: booking.postcode,
				country: booking.country,
				continent: booking.continent,
				currency: booking.currency,
			});
	}, [booking]);

	return (
		<form onSubmit={handleSubmit}>
			<div style={divStyles}>
				<label style={labelStyles}>name</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="child_name"
					value={formState.child_name}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>teeth</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="teeth"
					value={formState.teeth}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>address</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="address"
					value={formState.address}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>city</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="city"
					value={formState.city}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>postcode</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="postcode"
					value={formState.postcode}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>country</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="country"
					value={formState.country}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>continent</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="continent"
					value={formState.continent}
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>currency</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="currency"
					value={formState.currency}
					onChange={handleChange}
				></input>
			</div>
			<input style={inputStyles} type="submit" value="update booking"></input>
		</form>
	);
};
export default withRouter(EditBooking);
