const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./db/index');

const app = express();
const port = 8000;

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument),
);
app.use(express.json());
app.use(morgan('short'));
app.use('/', require('./routers/auth'));
app.use('/', require('./routers/blog'));

async function start() {
	try {
		app.listen(port, console.log(`server start on ${port}`));
		await db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error.message);
	}
}

start();
