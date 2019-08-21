'use strict'

//Imports
const app = require('../src/app');
const debug = require('debug')('nodestr: server');
const http = require('http');
// Imports

//Change Application Port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
// Change Application Port

//Server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor rodando na url http://localhost:${port}`)
});
//Server

server.on('error', onError);
server.on('Listening', onListening);


// NORMALIZE THE APPLICATION PORT
function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val
    }

    if(port >=0) {
        return port;
    }
    return false;
};// NORMALIZE THE APPLICATION PORT

// ERRORS TRATATIVES
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port:
        'Port' + port;
    switch(error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevatad previlegies');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}; // ERRORS TRATATIVES

// DEBUG APPLICATION
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on' + bind);
};// DEBUG APPLICATION