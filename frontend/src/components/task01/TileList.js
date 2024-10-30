import Tile from './Tile';
import './style.css';
import tableDataSource from './posts.json';
import { useState } from 'react';
const TileList = () => {
	const [filterValue, setFilterValue] = useState(100);
	const tableData = tableDataSource.slice(0, filterValue);
	return (
		<>
			<input
				type='range'
				max={100}
				min={1}
				value={filterValue}
				onChange={(e) => {
					setFilterValue(e.target.value);
				}}
			/>
			{filterValue}
			<div className='tileContainer'>
				{tableData.map((data) => (
					<Tile key={data.id} data={data} />
				))}
			</div>
		</>
	);
};

export default TileList;
