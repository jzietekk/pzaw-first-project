import '../style/style.css';
import { useState } from 'react';

const Component = () => {
	const myStyle = {
		backgroundColor: 'yellow',
		fontSize: '2em',
		color: 'black',
		padding: '20px',
		margin: '20px',
	};
	const [name, setName] = useState('Janek');
	return (
		<>
			<p className='clasa' style={myStyle}>
				eloelo
			</p>
			<p>{name}</p>
			<input
				type='text'
				defaultValue={'hello'}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<button onClick={() => setName('dyzio')}>ASDASD</button>
		</>
	);
};

export default Component;
