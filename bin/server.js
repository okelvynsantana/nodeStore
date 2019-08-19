'use strict'

//IMPORTS
const app = require('../src/app');
const debug = require('debug')('nodestr: server');
const http = require('http');
// FINAL IMPORTS


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);// CHANGE APPLICATION PORT


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor rodando na url http://localhost:${port}`)
});//SERVER

server.on('error', onError);
server.on('Listening', onListening);



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
}; // ERROS TRATATIVES

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on' + bind);
};// DEBUG APPLICATION