#! /usr/bin/env node

/* Dependencies
 * ------------------------------------- */
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./error-handler');

/* Routes
 * ------------------------------------- */
const root = require('./root.route');

/* Application
 * ------------------------------------- */
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

/* Export
 * ------------------------------------- */
module.exports = app;

/* Listeners
 * ---------------------------------------------------------- */
server.listen(port);
server.on('error', onError);
server.on('listening', onListen);

/* Express Middleware
 * ---------------------------------------------------------- */
app.use(cors());
app.use(bodyParser.json({ limit: process.env.BODY_SIZE }));
app.use(bodyParser.urlencoded({ extended: false }));

/* Express Routes
 * ---------------------------------------------------------- */
app.use('/', root);
app.use(errorHandler.notFound); // catch all - 404
app.use(errorHandler.report); //  handling errors


/* Internal
 * ---------------------------------------------------------- */
function onError(err) {
    if (err.syscall !== 'listen') {
        throw err;
    }

    const bind = (typeof port === 'string')
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (err.code) {
        case 'EACCESS':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }
}

function onListen() {
    const bind = (typeof port === 'string')
        ? `Pipe ${port}`
        : `Port ${port}`;

    console.log(`Listening on ${bind}`);
}
