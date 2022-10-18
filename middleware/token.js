const jwt = require('jsonwebtoken');

function checkToken (req, res, next) { 
    const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.email = decoded.email;
    next();
  });
}

module.exports = {checkToken};