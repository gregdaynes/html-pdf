#! /usr/bin/env node

const pdf = require('html-pdf');
const app = require('express')();
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;
server.listen(port);
server.on('error', err => { throw new Error(err); });
server.on('listening', () => console.log(`listening on ${port}`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

app.post('/',
    receiveFile,
    convertFile,
    (req, res) => res.send(req.data));

function receiveFile(req, res, next) {
    const chunks = [];

    req.on('data', chunk => chunks.push(new Buffer(chunk)));
    req.on('end', () => {
        req.data = Buffer.concat(chunks);
        next();
    });
}

function convertFile(req, res, next) {
    const html = req.data.toString();

    pdf.create(html).toBuffer((err, buffer) => {
        req.data = buffer.toString('base64');
        next();
    });
}
