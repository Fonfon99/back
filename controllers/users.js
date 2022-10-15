const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { prisma } = require('../db/db');





function createToken(email) {
  return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '4h'});
}

async function LogUser(req, res) {
  const {email, password} = req.body;
  
    const user = await getUser(email);
    if (user === null) return res.status(400).send('User not found');
    
    checkPassword(password, user.password)
        .then(result => {
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
  return prisma.user.findUnique({where: {email}})
}


async function signUpUser (req, res) {
    const {email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) return res.status(400).send('Passwords do not match');
    const user = await getUser(email);
    if (user) return res.status(400).send('User already exists');
    hashedPassword(password)
      .then((hash) => saveUser({email, password: hash}))
      .then((user) =>  res.send({user}))
      .catch(err => new Error(err));
}

function saveUser(user) {
  return prisma.user.create({data:user})
}

function hashedPassword(password) {
    const NUM_ROUNDS = 10;
    return bcrypt.hash(password, NUM_ROUNDS);
}




module.exports = {LogUser, signUpUser};