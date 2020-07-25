import React, { useState, useEffect } from 'react';
import { getFairyByContinent } from '../services/fairyServices';

const FairyProfile = ({ history, continent }) => {
	const initialState = {
		continent: 'continent',
		fairy_name: 'name',
		description: 'description',
	};

	const divStyle = {
		position: 'absolute',
		right: '20%',
		bottom: '40%',
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
	console.log(fairyData);
	return (
		<div style={divStyle}>
			<h1>{fairyData.fairy_name}</h1>
			<h2>The {fairyData.continent} Fairy</h2>
			<p>{fairyData.description}</p>
		</div>
	);
};

export default FairyProfile;
