import './style.css';
const Tile = (props) => {
	const iconsCount = 40;
	return (
		<div className='tile'>
			<h1>Title: {props.data.title}</h1>
			<hr />
			{props.data.id % 40 < 10 ? (
				<img src={`icons/Icon14_0${props.data.id % iconsCount}.png`} />
			) : (
				<img src={`icons/Icon14_${props.data.id % iconsCount}.png`} />
			)}
			<p>Description: {props.data.body}</p>
		</div>
	);
};

export default Tile;
