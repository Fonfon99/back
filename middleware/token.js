const jwt = require('jsonwebtoken');

function checkToken (req, res, next) { 
    const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');
  console.log(process.env.SECRET_KEY);
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).send('Invalid token');
    req.user = decoded;
    next();
  });
}

module.exports = {checkToken};