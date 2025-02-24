import { useEffect, useState } from 'react';
import Row from './Row';
import './style.css';

function Table() {
	const [data, setData] = useState();
	const [activeRow, setActiveRow] = useState(null);
	const [search, setSearch] = useState('');
	const [salaryFilter, setSalaryFilter] = useState('');
	const [salaryCondition, setSalaryCondition] = useState('more');

	useEffect(() => {
		fetch('http://localhost:8000/api/employees')
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	const handleRowClick = (index) => {
		setActiveRow(activeRow === index ? null : index);
	};

	return (
		<>
			<input
				type='text'
				placeholder='Szukaj po imieniu lub nazwisku'
				onChange={(e) => setSearch(e.target.value)}
			/>
			<select onChange={(e) => setSalaryCondition(e.target.value)}>
				<option value='more'>Więcej</option>
				<option value='less'>Mniej</option>
			</select>
			<input
				type='number'
				placeholder='Pensja'
				onChange={(e) => setSalaryFilter(e.target.value)}
			/>
			<table>
				{data ? (
					data.employees.map((item, index) => {
						const matchesSearch =
							!search ||
							item.first_name.toLowerCase().includes(search.toLowerCase()) ||
							item.last_name.toLowerCase().includes(search.toLowerCase());

						const matchesSalary =
							!salaryFilter ||
							(salaryCondition === 'more' && item.salary >= salaryFilter) ||
							(salaryCondition === 'less' && item.salary <= salaryFilter);

						if (matchesSearch && matchesSalary) {
							return (
								<Row
									item={item}
									key={index}
									onClick={() => handleRowClick(index)}
									className={activeRow === index ? 'background-red' : ''}
								/>
							);
						}
						return null;
					})
				) : (
					<div>no data</div>
				)}
			</table>
		</>
	);
}

export default Table;
