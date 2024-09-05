

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

//create signout function . include with .clearCookie('access_token').status(200).json("Signout successful"), use try catch block to handle error

function signout(req, res) {
  try {
    res.clearCookie('access_token').status(200).json("Signout successful");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

const getProfile = (req, res) => {
  const userId = req.user.userId;  // Extract userId from req.user set by the authenticate middleware
  models.Users.findOne({ where: { id: userId } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
};


const getUsers = (req, res) => {
  models.Users.findAll({ attributes: ['name', 'role'] })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

// Create a new user
const createUserp = (req, res) => {
  const { name, username, password, role } = req.body;

  models.Users.findOne({ where: { username } })
    .then(existingUser => {
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(password, salt, function(err, hash) {
          const newUser = {
            name,
            username,
            password: hash,
            role
          };

          models.Users.create(newUser)
            .then(result => {
              res.status(201).json({ message: "User created successfully" });
            })
            .catch(error => {
              res.status(500).json({ message: "Something went wrong" });
            });
        });
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

// Delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;

  models.Users.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the requester has admin role or is deleting their own account
      if (req.user.role !== 'admin' && req.user.userId !== user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this user" });
      }

      user.destroy()
        .then(() => {
          res.status(200).json({ message: "User deleted successfully" });
        })
        .catch(error => {
          res.status(500).json({ message: "Something went wrong" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports = {
    createUser : createUser,
    login: login,
    signout: signout,
    getProfile: getProfile,
    getUsers,
  createUserp,
  deleteUser
}