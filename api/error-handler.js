module.exports = {
    notFound,
    report,
};

function notFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function report(err, req, res) {
    const dev = (process.env.NODE_ENV === 'development');

    console.log(err);

    res.status(err.status || 500);

    if (dev) {
        res.json({
            success: err.success,
            message: err.message,
            data: err.data,
        });
    } else {
        res.json({});
    }

    res.end();
}
