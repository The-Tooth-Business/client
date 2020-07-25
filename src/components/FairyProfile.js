import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';

const FairyProfile = ({ history, continent }) => {
	const { store, dispatch } = useGlobalState();
	const [errorMessage, setErrorMessage] = useState(null);

	// useEffect(() => {
	//     getFairyData(continent)
	// })

	return <div></div>;
};

export default withRouter(FairyProfile);
