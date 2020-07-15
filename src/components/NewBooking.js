import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import currencies from '../supported-currencies.json';
import { useGlobalState } from '../config/globalState'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	layout: {
	  width: 'auto',
	  marginLeft: theme.spacing(2),
	  marginRight: theme.spacing(2),
	  [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
		width: 600,
		marginLeft: 'auto',
		marginRight: 'auto',
		},
	},
	paper: {
	  marginTop: 40,
	  marginBottom: theme.spacing(3),
	  padding: 8,
	  [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
		marginTop: theme.spacing(20),
		marginBottom: theme.spacing(6),
		padding: theme.spacing(3),
	  },
	},
	buttons: {
	  display: 'flex',
	  justifyContent: 'flex-end',
	},
	button: {
	  marginTop: theme.spacing(3),
	  marginLeft: theme.spacing(1),
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
  }));

const NewBooking = ({ history, nextId }) => {
	const { dispatch } = useGlobalState();
	const classes = useStyles();

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
		dispatch({
			type: 'addBooking',
			data: newBooking,
		});

		history.push('/success');
	}

return (
	<React.Fragment>
	<main className={classes.content}>
        <Paper className={classes.paper}>
		
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
            label="Address"
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
            label="continent"
            fullWidth
            autoComplete="continent"
			onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />} 
			label="Save this address?"
          />
        </Grid>
      </Grid>
	  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
				  Book now
        </Button>           
</Paper>
</main>
    </React.Fragment>
  );
}
							
			
export default withRouter(NewBooking);
