const express = require('express');
const app = express();

app.get('/', (req, res) => {
	// res.statusCode = 405;
	res.send(
		"Stop yappin' y'all skibidi sigmas, start coding!<br>🗣️🗣️🗣️CHAT IS THIS REAL???<br>GYAAAATTTTTTT"
	);
});
const sciRouter = express.Router();

sciRouter.get('/pizza', (req, res) => {
	const data = {
		message:
			'eloeloeloeloeloloeloloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloeloelo',
	};
	res.json(data);
	// res.send('Pizza is a dish!');
});

sciRouter.get('/zubat', (req, res) => {
	res.send('Zubat is a bird!');
});

app.use('/sci', sciRouter);

app.post('/', (req, res) => {
	res.send('eueuueueueu');
});

app.get('/helloworld', (req, res) => {
	res.send("Hello skibidi sigmas, what's you doin'? I dunno.");
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
