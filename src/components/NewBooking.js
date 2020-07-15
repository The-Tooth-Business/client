import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import currencies from '../supported-currencies.json';
import { addBooking } from '../services/bookingsServices';

const NewBooking = ({ history }) => {
	const { dispatch, store } = useGlobalState();
	const { bookings } = store;

	const formStyles = {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		alignItems: 'center',
		border: '1px solid lightgrey',
		padding: '10px',
	};

	const divStyles = {
		display: 'grid',
		width: '100vw',
	};

	const inputStyles = {
		width: '40vw',
		height: '2em',
		margin: '1em',
	};

	const labelStyles = {
		fontSize: '1.5em',
	};

	//state
	const initialFormState = {
		name: '',
		surname: '',
		teeth: '',
		address: '',
		city: '',
		postcode: '',
		country: '',
		continent: '',
		currency: '',
	};
	const [formState, setFormState] = useState(initialFormState);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({ ...formState, [name]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newBooking = {
			child_name: formState.name,
			teeth: formState.teeth,
			address: formState.address,
			city: formState.city,
			postcode: formState.postcode,
			country: formState.country,
			continent: formState.continent,
			currency: formState.currency,
		};
		addBooking(newBooking)
			.then((response) => {
				dispatch({
					type: 'addBooking',
					data: response,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				console.log('There was an error adding your booking', error);
			});
	}

	return (
		<form styles={formStyles} onSubmit={handleSubmit}>
			<div style={divStyles}>
				<label style={labelStyles}>name</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="name"
					placeholder="name"
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>surname</label>
				<input
					style={inputStyles}
					required
					type="text"
					name="surname"
					placeholder="surname"
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
					placeholder="number of teeth"
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
					placeholder="address"
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
					placeholder="city"
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
					placeholder="postcode"
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
					placeholder="country"
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
					placeholder="continent"
					onChange={handleChange}
				></input>
			</div>
			<div style={divStyles}>
				<label style={labelStyles}>currency</label>
				<select name="currency" onChange={handleChange}>
					{currencies.map((obj, index) => (
						<option key={`${index}-${obj.country}`} value={obj.currency}>
							{' '}
							{obj.country}{' '}
						</option>
					))}
				</select>
			</div>
			<input style={inputStyles} type="submit" value="book now"></input>
		</form>
	);
};
export default withRouter(NewBooking);
