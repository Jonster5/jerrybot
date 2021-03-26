import { config } from 'dotenv';
import { Client } from 'dogehouse.js';
import { quotes } from './quotes.js';

config();

const app = new Client();

app.connect(
	process.env.DOGEHOUSE_TOKEN,
	process.env.DOGEHOUSE_REFRESH_TOKEN
).then(async () => {
	spout();
	setInterval(spout, 600_000);
});

const spout = () => {
	app.rooms.join('4dc3387f-02d2-4476-b368-1443b0b5feb6');

	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	app.bot.sendMessage(randomQuote);
	console.log(randomQuote);
};
