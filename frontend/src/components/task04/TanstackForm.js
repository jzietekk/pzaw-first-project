import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TanstackForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:8000/api/tanstack/user/register',
				data
			);
			alert('Rejestracja powiodła się!');
		} catch (error) {
			alert(error.response?.data?.message || 'Błąd podczas rejestracji');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white p-6 rounded-lg shadow-md w-96'
			>
				<h2 className='text-2xl font-bold mb-4 text-center'>Rejestracja</h2>

				{/* Email */}
				<div className='mb-4'>
					<label className='block text-gray-700 font-medium mb-1'>Email:</label>
					<input
						type='email'
						{...register('email', {
							required: 'Email jest wymagany',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Nieprawidłowy format email',
							},
						})}
						className='w-full border rounded px-3 py-2'
					/>
					{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
				</div>

				{/* Password */}
				<div className='mb-4'>
					<label className='block text-gray-700 font-medium mb-1'>Hasło:</label>
					<input
						type='password'
						{...register('password', {
							required: 'Hasło jest wymagane',
							minLength: {
								value: 6,
								message: 'Hasło musi mieć co najmniej 6 znaków',
							},
						})}
						className='w-full border rounded px-3 py-2'
					/>
					{errors.password && (
						<p className='text-red-500 text-sm'>{errors.password.message}</p>
					)}
				</div>

				{/* Select (School) */}
				<div className='mb-4'>
					<label className='block text-gray-700 font-medium mb-1'>Szkoła:</label>
					<select
						{...register('school', { required: 'Wybór szkoły jest wymagany' })}
						className='w-full border rounded px-3 py-2'
					>
						<option value=''>Wybierz szkołę</option>
						<option value='sci'>SCI</option>
						<option value='tme'>TME</option>
						<option value='zut'>ZUT</option>
						<option value='pm'>PM</option>
						<option value='us'>US</option>
					</select>
					{errors.school && (
						<p className='text-red-500 text-sm'>{errors.school.message}</p>
					)}
				</div>

				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
				>
					Zarejestruj
				</button>
			</form>
		</div>
	);
};

export default TanstackForm;
