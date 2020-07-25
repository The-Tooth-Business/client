import React, { useState, useEffect } from 'react';
import { getFairyByContinent } from '../services/fairyServices';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../images/avatar.jpg';

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	avatar: {
		width: '300px',
		height: '300px',
		borderRadius: '50%',
		backgroundImage: `url(${avatar})`,
		backgroundRepeat: 'no-repeat',
		opacity: 0.9,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
}));

const FairyProfile = ({ history, continent }) => {
	const classes = useStyles();
	const initialState = {
		continent: 'continent',
		fairy_name: 'name',
		description: 'description',
	};

	const [fairyData, setFairyData] = useState(initialState);

	useEffect(() => {
		getFairyByContinent(continent)
			.then((fairy) => {
				setFairyData(fairy);
			})
			.catch((error) => {
				console.log('An error occurred setting fairy data: ', error);
			});
	}, [continent]);

	return (
		<div>
			<div className={classes.toolbar} />
			<main className={classes.content}>
				<div className={classes.avatar}> </div>
				<Card
					number={fairyData.fairy_name}
					text={`The ${fairyData.continent} Fairy`}
					background={
						'linear-gradient(45deg, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)'
					}
				/>
				{/* <h1>{fairyData.fairy_name}</h1>
			<h2>The {fairyData.continent} Fairy</h2> */}
				<p>{fairyData.description}</p>
			</main>
		</div>
	);
};

export default FairyProfile;
