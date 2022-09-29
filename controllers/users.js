const jwt = require('jsonwebtoken');
const users = [];
const bcrypt = require('bcrypt');


function LogUser(req, res) {
    const {email, password} = req.body;
    const user = getUser(email);
    if (user === null) return res.status(400).send('User not found');
    
    checkPassword(user, password)
        .then(result => {
            if (!result) { return res.status(400).send('Invalid password'); }
            const token = createToken(email);
            res.send({token, message: 'Logged in successfully', email: user.email});
        })
        .catch(err => res.status(500).send(err))
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
      .then(hashedPassword)
      .catch(err => new Error(err));
    const newUser = {email, hashedPassword};
    users.push(newUser);
    res.send({message: 'User created successfully'});
}

function hashedPassword(password) {
    const NUM_ROUNDS = 10;
    return bcrypt.hash(password, NUM_ROUNDS);
}



module.export = {LogUser, signUpUser}