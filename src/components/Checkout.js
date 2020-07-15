import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState'

  
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

const NewBooking = ({ history, nextId }) => {

	const { dispatch } = useGlobalState()
	
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
				<input
					style={inputStyles}
					required
					type="text"
					name="currency"
					placeholder="currency"
					onChange={handleChange}
				></input>
			</div>
			<input style={inputStyles} type="submit" value="book now"></input>
		</form>
	);
};
export default withRouter(NewBooking);
