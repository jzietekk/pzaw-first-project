import MyOwnRow from './MyOwnRow';
const MyOwnTable = () => {
	const data = [
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
		'Row 1, Col 1',
	];
	const data1 = [
		{
			id: '06006142-bee4-4ee4-9240-73e361c66df6',
			key1: 'asdjhakjdhakjdhkjahsdkjaskjdh',
			key2: 'asdasd',
		},
		{
			id: 'eb187b58-c378-43bb-85e8-88dd83ac23bb',
			key1: 'akasdadasdkka',
			key2: 'aasdasdasdasdsdasd',
		},
		{
			id: '5ab74f32-63c7-4595-83e4-c2a8e59357ad',
			key1: 'akkhjkhjkhjkka',
			key2: 'asfgfgfgdasd',
		},
	];

	return (
		<table className='tabela'>
			<thead>
				<tr>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
					<th>sadasd</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
					<td>asdasdsa</td>
				</tr>
				<tr>
					{data.map((item, id, arr) => (
						<td key={id}>{item}</td>
					))}
				</tr>
				{data1.map((item, id, arr) => (
					<MyOwnRow key={id} item={item} />
				))}
			</tbody>
		</table>
	);
};

export default MyOwnTable;
