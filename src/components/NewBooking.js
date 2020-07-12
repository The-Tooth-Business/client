import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const NewBooking = ({ history, nextId }) => {

	const { dispatch } = useGlobalState()
	

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
			_id: nextId,
			name: formState.name,
			surname: formState.surname,
			teeth: formState.teeth,
			address: formState.address,
			city: formState.city,
			postcode: formState.postcode,
			country: formState.country,
			continent: formState.continent,
			currency: formState.currency,
			modified_date: new Date(),
		};
		dispatch ({
			type: 'addBooking',
			data: newBooking
		})
		
		// history.push(`/bookings/${nextId}`)
		history.push('/success');
	}

	return (
		<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="surname"
            name="surname"
            label="surname"
            fullWidth
            autoComplete="surname"
			onchange={handleChange}
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="teeth"
            name="teeth"
            label="number of teeth"
            fullWidth
            autoComplete="number of teeth"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address "
            fullWidth
            autoComplete="address"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="city"
            fullWidth
            autoComplete="shipping address-level2"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="postcode" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
			onChange={handleChange}
          />
        </Grid>
		<Grid item xs={12} sm={6}>
          <TextField
            required
            id="continent"
            name="continent"
            label="contenent"
            fullWidth
            autoComplete="continent"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
	  <input type="submit" value="book now"></input>
    </React.Fragment>
  );
}
			
			
			
			
			
					
			
	
export default withRouter(NewBooking);
