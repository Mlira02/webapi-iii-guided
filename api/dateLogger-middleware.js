module.exports = logger;

function logger(req, res, next) {
    console.log(`My own logger [${new Date().toISOString()}] ${req.method} to ${req.url}`);

    next();
}