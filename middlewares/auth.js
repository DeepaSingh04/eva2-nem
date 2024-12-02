const jwt = require('jsonwebtoken');
exports.authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') throw new Error();
        next();


    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });

    }

};