import { useState } from "react";
import { UserContactMutation } from "./UserContactMutation";

const errorCodes = {
	empty_fullName: 'Please provide your full name.',
	empty_email: 'Please provide your email.',
	empty_number: 'Please provide your email.',
	empty_message: 'Please provide your password.',
};

export const UseRegistration = () => {
	const [error, setError] = useState(null);
	const [status, setStatus] = useState('idle');
	const { registerMutation } = UserContactMutation();

	const register = (fullName, email, phoneNumber, message) => {
		setError(null);
		setStatus('resolving');

		return registerMutation(fullName, email, phoneNumber, message)
		.then(() => {
			setStatus('resolved');
		})
		.catch((errors) => {
			setError(errorCodes[errors.message] || errors.message);
			setStatus('resolved');
		});
	};
	
	return {
		register,
		error,
		status,
	};
};