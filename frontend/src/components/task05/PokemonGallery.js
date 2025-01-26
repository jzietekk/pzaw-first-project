import React, { useState, useEffect } from 'react';
import './style.css'; // Stylizacja (opis poniżej)

const PokemonGallery = () => {
	const [currentImages, setCurrentImages] = useState([]);
	const [loadedImages, setLoadedImages] = useState({});
	const [loadingImages, setLoadingImages] = useState({});
	const [startIndex, setStartIndex] = useState(1);

	const totalImages = 20;

	const loadImage = async (id) => {
		if (loadedImages[id]) {
			return loadedImages[id];
		}

		setLoadingImages((prev) => ({ ...prev, [id]: true }));
		const response = await fetch(`http://localhost:8000/api/pokemon/image/${id}`);
		const blob = await response.blob();
		const imageUrl = URL.createObjectURL(blob);

		setLoadedImages((prev) => ({ ...prev, [id]: imageUrl }));
		setLoadingImages((prev) => {
			const updated = { ...prev };
			delete updated[id];
			return updated;
		});

		return imageUrl;
	};

	const loadImages = async () => {
		const images = await Promise.all(
			Array.from({ length: 5 }, (_, i) => loadImage(((startIndex + i - 1) % totalImages) + 1))
		);
		setCurrentImages(images);
	};

	useEffect(() => {
		loadImages();
	}, [startIndex]);

	const handleNext = () => {
		setStartIndex((prev) => (prev % totalImages) + 1);
	};

	const handlePrev = () => {
		setStartIndex((prev) => ((prev - 2 + totalImages) % totalImages) + 1);
	};

	const handleRemoveFromList = (id) => {
		setLoadedImages((prev) => {
			const updated = { ...prev };
			delete updated[id];
			return updated;
		});
	};

	return (
		<div className='container'>
			<div className='gallery'>
				<button id='prev' onClick={handlePrev}>
					{'<'}
				</button>
				<button id='next' onClick={handleNext}>
					{'>'}
				</button>
				<div className='images'>
					{Array.from({ length: 5 }, (_, i) => {
						const id = ((startIndex + i - 1) % totalImages) + 1;
						return (
							<div key={id} className='image-container'>
								{loadingImages[id] ? (
									<p className='loading-text'>Loading...</p>
								) : (
									<img
										src={loadedImages[id]}
										alt={`Pokemon ${id}`}
										className='pokemon-image'
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className='loaded-list'>
				<h3>Loaded Images</h3>
				<ul>
					{Object.entries(loadedImages).map(([id, src]) => (
						<li key={id} className='loaded-item'>
							<img src={src} alt={`Pokemon ${id}`} width={50} />
							<label
								style={{ cursor: 'pointer' }}
								onClick={() => handleRemoveFromList(id)}
							>
								Remove
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PokemonGallery;
