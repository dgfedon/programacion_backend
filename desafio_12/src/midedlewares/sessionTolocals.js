async function sessionTolocals(req, resp, next) {
    if (req.user) {
        resp.locals.user = req.user;
    }

    next();
}

module.exports = sessionTolocals;