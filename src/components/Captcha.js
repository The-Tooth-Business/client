import React, { useState, useEffect } from 'react';
import captcha from '../data/captcha.json';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { useGlobalState } from '../config/globalState';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
}));

export default function Captcha() {
	const { store, dispatch } = useGlobalState();
	const { captchaAttempt } = store;
	const classes = useStyles();
	const initialState = {
		question: 'What is love?',
		answers: ["Baby don't hurt me", 'The best!', 'Love is what parents do'],
		correct: "Baby don't hurt me",
	};

	const [value, setValue] = useState('');
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('Choose wisely');
	const [question, setQuestion] = useState(initialState);

	useEffect(() => {
		let questions = captcha.map((q) => q);
		let q = questions[Math.floor(Math.random() * questions.length)];
		setQuestion(q);
		dispatch({
			type: 'setAnswer',
			data: q.correct,
		});
	}, [captchaAttempt, dispatch]);

	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
		dispatch({
			type: 'setCaptchaValue',
			data: event.target.value,
		});
	};

	return (
		<FormControl
			component="fieldset"
			error={error}
			className={classes.formControl}
		>
			<FormLabel component="legend">{question.question}</FormLabel>
			{/* <p>{questions}</p> */}
			<RadioGroup
				aria-label="quiz"
				name="quiz"
				value={value}
				onChange={handleRadioChange}
			>
				{question.answers.map((answer, index) => (
					<FormControlLabel
						key={answer}
						value={answer}
						control={<Radio />}
						label={answer}
					/>
				))}
			</RadioGroup>
			<FormHelperText>{helperText}</FormHelperText>
			{/* <Button
				type="submit"
				variant="outlined"
				color="primary"
				className={classes.button}
				onSubmit={handleSubmit}
			>
				Check Answer
			</Button> */}
		</FormControl>
	);
}
