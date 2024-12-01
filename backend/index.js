const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pokedex = require('./pokedex.json');
const types = require('./types.json');
const path = require('path');

const corsOptions = {
	origin: '*',
	methods: 'GET, POST, PUT, DELETE',
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/images', express.static(path.join(__dirname, 'pictures')));
app.use(cors(corsOptions));
app.use(bodyParser.json());

// testing how express works
{
	// app.get('/', (req, res) => {
	// 	res.statusCode = 404;
	// 	res.send(
	// 		"Stop yappin' y'all skibidi sigmas, start coding!<br>🗣️🗣️🗣️CHAT IS THIS REAL???<br>GYAAAATTTTTTT"
	// 	);
	// });
	// const sciRouter = express.Router();
	// sciRouter.get('/pizza', (req, res) => {
	// 	const data = {
	// 		message:
	// 			'eloeloeloeloeloloeloloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloelo',
	// 	};
	// 	res.json(data);
	// 	// res.send('Pizza is a dish!');
	// });
	// sciRouter.get('/zubat', (req, res) => {
	// 	res.send('Zubat is a bird!');
	// });
	// app.use('/sci', sciRouter);
	// app.post('/', (req, res) => {
	// 	res.send('eueuueueueu');
	// });
	// app.get('/helloworld', (req, res) => {
	// 	res.send("Hello skibidi sigmas, what's you doin'? I dunno.");
	// });
}

// task 2 - users
{
	const usersRouter = express.Router();
	app.use('/api/users', usersRouter);

	let users = [];
	usersRouter.post('/add', (req, res) => {
		const user = req.body;
		users.push(user);
		res.send(users);
	});
	usersRouter.get('/list', (req, res) => {
		res.json(users);
	});
}

// task 3 - pokemons
{
	const pokemonRouter = express.Router();
	app.use('/api/pokemon', pokemonRouter);

	pokemonRouter.get('/types', (req, res) => {
		res.json(types);
	});

	pokemonRouter.get('/pokedex', (req, res) => {
		res.json(pokedex);
	});

	pokemonRouter.get('/', (req, res) => {
		res.json(pokedex);
	});
	pokemonRouter.get('/search', (req, res) => {
		const { types = [], searchQuery } = req.query;

		let typesArray = [];
		const filteredPokemon = pokedex.filter(p => {
			const matchesType = types.some(type => p.type.includes(type));
			const matchesSearchQuery = !searchQuery || Object.values(p.name).some(
				name => String(name).toLowerCase().includes(searchQuery.toLowerCase())
			);

			return matchesType && matchesSearchQuery;
		});
		res.json(filteredPokemon);
	});

	pokemonRouter.get('/:id', (req, res) => {
		const pokemonId = parseInt(req.params.id, 10);
		const pokemon = pokedex.find(p => p.id === pokemonId);

		if (pokemon) {
			res.json(pokemon);
		} else {
			res.status(404).json({ error: 'Pokemon not found' });
		}
	});

	pokemonRouter.get('/type/:type', (req, res) => {
		const requestedTypes = req.params.type;

		if (!requestedTypes) {
			return res.status(400).json({ error: 'No types provided' });
		}

		const typesArray = requestedTypes.split('&').map(type => type.trim());

		const filteredPokemon = pokedex.filter(p =>
			typesArray.some(type => p.type.includes(type))
		);

		if (filteredPokemon.length > 0) {
			res.json(filteredPokemon);
		} else {
			res.status(404).json({ error: `No Pokemon found for types: ${typesArray.join(', ')}` });
		}
	});

	pokemonRouter.get('/image/:id', (req, res) => {
		const pokemonId = req.params.id.padStart(3, '0');
		const imagePath = path.join(__dirname, 'pictures', `${pokemonId}.png`);

		res.sendFile(imagePath, (err) => {
			if (err) {
				res.status(404).json({ error: `Image not found for Pokemon ID: ${pokemonId}` });
			}
		});

	});



}

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
