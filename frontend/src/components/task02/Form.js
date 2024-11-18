import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [gender, setGender] = useState('');
	const [users, setUsers] = useState([]);
	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleRememberMeChange(e) {
		setRememberMe(e.target.checked);
	}

	function handleGenderChange(e) {
		console.log(e.target.value);
		setGender(e.target.value);
	}
	function submitData() {
		axios
			.post('http://localhost:8000/api/users', {
				name: name,
				email: email,
				password: password,
				rememberMe: rememberMe,
				gender: gender,
			})
			.then((response) => {
				setUsers(response.data);
				console.log(users);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	return (
		<div>
			<form>
				<input
					type='text'
					id='name'
					placeholder='Enter your name'
					onChange={(e) => handleNameChange(e)}
				/>
				<label htmlFor='name'>nejm</label>
				<input
					type='email'
					id='email'
					placeholder='Enter your email'
					onChange={(e) => handleEmailChange(e)}
				/>
				<label htmlFor='email'>imejl</label>
				<input type='password' id='password' onChange={(e) => handlePasswordChange(e)} />
				<label htmlFor='password'>chasło</label>
				<input
					type='checkbox'
					id='rememberMe'
					onChange={(e) => handleRememberMeChange(e)}
				/>
				<label htmlFor='rememberMe'>Zapamientaj mnie</label>

				<input
					type='radio'
					name='gender'
					id='memszczyzna'
					value='man'
					onChange={(e) => handleGenderChange(e)}
				/>
				<label htmlFor='memszczyzna'>Memszczyzna</label>
				<input
					type='radio'
					name='gender'
					id='kombieta'
					value='wymyn'
					onChange={(e) => handleGenderChange(e)}
				/>
				<label htmlFor='kombieta'>Kombieta</label>
			</form>
			<button onClick={() => submitData()}>Submit</button>
			{users.map((user) => (
				<div key={user.id} style={{ display: 'flex' }}>
					<p>Name: {user.name}</p>
					<p>Email: {user.email}</p>
					<p>Password: {user.password}</p>
					<p>Remember Me: {user.rememberMe ? 'Yes' : 'No'}</p>
					<p>Gender: {user.gender}</p>
				</div>
			))}
		</div>
	);
};

export default Form;
