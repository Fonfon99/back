const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user1 = {email: 'louis@louis.com', password: '$2b$10$5P7eWHhIHhKxewuy1aRnf.R9tEGA/r6HzBeMmxKlcqwLDuSQFsXfa'};
const users = [user1];



function LogUser(req, res) {
    const {email, password} = req.body;
    console.log("req", req.body);
    const user = getUser(email);
    console.log("user", user);
    if (user === null) return res.status(400).send('User not found');
    
    checkPassword(password, user.password)
        .then(result => {
          console.log("result", result);
            if (!result) { return res.status(400).send('Invalid password'); }
            const token = createToken(email);
            res.send({token, message: 'Logged in successfully', email});
        })
        .catch(err => console.error(err))
}

function checkPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

function getUser(email) {
  return users.find(user => user.email === email);
}

function createToken(email) {
  return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '4h'});
}

function signUpUser (req, res) {
    const {email, password} = req.body;
    const user = getUser(email);
    if (user) return res.status(400).send('User already exists');
    hashedPassword(password)
      .then((hash) => {
        users.push({email, password: hash});
        res.send({message: 'User created successfully'});
      })
      .catch(err => new Error(err));
}

function hashedPassword(password) {
    const NUM_ROUNDS = 10;
    return bcrypt.hash(password, NUM_ROUNDS);
}




module.exports = {LogUser, signUpUser};