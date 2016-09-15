const pdf = require('html-pdf');

module.exports = {
    receiveFile,
    convertFile,
};

function receiveFile(req, res, next) {
    req.setEncoding('utf8');

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
