/* eslint-env node */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from "http";
import debugLib from "debug";
import process from 'node:process';

import './databases/connection/mongo.connection.js';
import studentRouter from './routers/student.router.js';
import swaggerRouter from './routers/swagger.router.js';
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { corsConfig } from "./middlewares/cors.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(corsConfig);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/students', studentRouter);
app.use('/api-docs', swaggerRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(errorHandler);

// Server setup
const port = normalizePort(process.env.EXPRESS_PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const debug = debugLib('backend:server');
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('API documentation available at http://localhost:' + port + '/api-docs/ui');
    console.log('OpenAPI JSON available at http://localhost:' + port + '/api-docs');
}

export default app;
