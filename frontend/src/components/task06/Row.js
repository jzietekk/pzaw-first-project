function Row({ item, onClick, className }) {
	return (
		<tr onClick={onClick} className={className}>
			<td>{item.id}</td>
			<td>{item.first_name}</td>
			<td>{item.last_name}</td>
			<td>{item.department}</td>
			<td>{item.position}</td>
			<td>{item.salary}</td>
			<td>{item.hire_date}</td>
		</tr>
	);
}

export default Row;
