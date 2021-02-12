const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const server = express();

const sessionConfig = {
	name: 'mjmsession',
	secret: '7bfece61a4dbbc7b427355fd1499a851',
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false,

	store: new knexSessionStore({
		knex: require("../data/dbConfig.js"),
		tablename: "sessions",
		sidfieldname: "sid",
		createtable: true,
		clearInterval: 1000 * 60 * 60
	})
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(cookieParser);
server.use(session(sessionConfig));

server.get("/", (req, res) => {
	res.json({
		api: "up"
	});
});

// MIDDLEWARE

server.use((err, req, res, next) => {
	err.statusCode = err.statusCode ? err.statusCode : 500;
	res.status(err.statusCode).json({
		mes: err.message,
		stack: err.stack
	})
})

module.exports = server;