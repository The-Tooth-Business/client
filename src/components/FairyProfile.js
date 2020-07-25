import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import { useGlobalState } from '../config/globalState';
import { getFairyByContinent } from '../services/fairyServices';

const FairyProfile = ({ history, continent }) => {
	// const { store, dispatch } = useGlobalState();
	// const [errorMessage, setErrorMessage] = useState(null);
	const initialState = {
		continent: '',
		fairy_name: '',
		description: '',
	};

	const [fairyData, setFairyData] = useState(initialState);

	useEffect(() => {
		getFairyByContinent(continent).then((fairy) => {
			setFairyData(fairy);
		});
	});

	return <div>{fairyData}</div>;
};

export default withRouter(FairyProfile);
