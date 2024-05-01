

const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createUser(req, res) {

  models.Users.findOne({where:{username: req.body.username}}).then(result => {
    if(result){
      res.status(409).json({message: "User already exists"});
    
    }
    else{

      bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(req.body.password, salt, function(err, hash) {
          const users = {
            name: req.body.name,
            username: req.body.username,
            password: hash,
            role: req.body.role
          };
            models.Users.create(users)
                .then(result => {
                    res.status(201).json({message: "User created successfully"});
                }
                ).catch(error => {
                    res.status(500).json({message: "Somethig went wrong"});
                });
      
        });
    
      });

    }
  }).catch(error => {
      res.status(500).json({message: "Somethig went wrong"});
  });

 

  
  
  
}


function login(req, res) {
  models.Users.findOne({ where: { username: req.body.username } }).then(user => {
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    bcryptjs.compare(req.body.password, user.password, function(err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokenPayload = {
        username: user.username,
        userId: user.id,
        role: user.role 
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_KEY);

      // Include user role in the response
      res.status(200).json({ message: "Authentication successful", token: token, role: user.role });
    });
  }).catch(error => {
    res.status(500).json({ message: "Something went wrong" });
  });
}


module.exports = {
    createUser : createUser,
    login: login
}