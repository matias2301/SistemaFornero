const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('x-auth-token');

    if( !token ) return res.status(401).json({ msg: 'Must provide a token' });

    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_WORD);
        req.user = verifyToken.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}