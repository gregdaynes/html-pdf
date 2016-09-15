const router = require('express').Router();
const middleware = require('./middleware');

module.exports = router;


router.get('/',
    (req, res) => {
        res.status(200);
        res.json({ message: 'Hello World' });
        return res.end();
    });

router.post('/',
    middleware.receiveFile,
    middleware.convertFile,
    (req, res) => {
        res.status(200);
        res.send(req.data);
        return res.end();
    });
