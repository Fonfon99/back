const jwt = require('jsonwebtoken');

function checkToken (req, res, next) { 
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
  if (!token) return res.status(401).send('Access denied');
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).send('Invalid token');
    req.email = decoded.email;
    next();
  });
}

module.exports = {checkToken};