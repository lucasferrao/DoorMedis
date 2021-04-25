const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
    const token = req.header("token");
    //const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, '02b51cd4-2cce-44ba-8c2a7fd09b4813b1');
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
};
