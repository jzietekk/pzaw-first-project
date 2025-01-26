import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
	const { data } = await axios.get('http://localhost:8000/api/tanstack/users');
	return data;
};

const TanstackForm = () => {
	const queryClient = useQueryClient();

	// TanStack Query: Pobieranie użytkowników
	const { data: users, isLoading, error } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const { data } = await axios.get('http://localhost:8000/api/tanstack/users');
			return data;
		},
	});

	// TanStack Query: Rejestracja użytkownika
	const mutation = useMutation({
		mutationFn: (newUser) =>
			axios.post('http://localhost:8000/api/tanstack/user/register', newUser),

		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		},
		onError: (error) => {
			alert(error.response?.data?.message || 'Błąd podczas rejestracji');
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutation.mutate(data);
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white p-6 rounded-lg shadow-md w-96 mb-6'
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

			{/* Lista użytkowników */}
			<div className='bg-white p-6 rounded-lg shadow-md w-96'>
				<h3 className='text-xl font-bold mb-4'>Lista użytkowników</h3>
				{isLoading && <p>Ładowanie użytkowników...</p>}
				{error && <p className='text-red-500'>Błąd: {error.message}</p>}
				<ul className='space-y-2'>
					{users?.map((user, index) => (
						<li key={index} className='border rounded px-3 py-2 bg-gray-50 shadow-sm'>
							<strong>Email:</strong> {user.email} <br />
							<strong>Szkoła:</strong> {user.school}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TanstackForm;
