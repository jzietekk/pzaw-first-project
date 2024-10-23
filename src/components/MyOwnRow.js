const MyOwnRow = (props) => {
	return (
		<tr>
			<td>{props.item.id}</td>
			<td>{props.item.key1}</td>
			<td>{props.item.key2}</td>
		</tr>
	);
};

export default MyOwnRow;
