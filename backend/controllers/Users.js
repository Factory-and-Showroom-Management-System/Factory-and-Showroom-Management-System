import User from "../models/UserModel.js";
import argon2 from "argon2";

export const createUser = async (req, res) => {
  const { name, username, password,confPassword, role } = req.body;
  if(password !== confPassword)return res.status(400).json({message: "Password not match"});
  const hashedPassword = await argon2.hash(password);
  try{
    await User.create({
        name: name,
        username: username,
        password: hashedPassword,
        role: role
    });
    res.status(201).json({message: "User created successfully"});
  }catch (error) {
    res.status(400).json({message: error.message});
  }
};

export const getUsers = async (req, res) => {
    
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'username', 'role']
        });
        res.status(200).json(response);

    }catch (error) {
        res.status(500).json({message: error.message});
    }
    
};

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'username', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
        
    }catch (error) {
        res.status(500).json({message: error.message});
    }

};
export const updateUser = async (req, res) => {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({message: "User not found"});
        const { name, username,password,confPassword, role } = req.body;
        let hashedPassword;
        if(password === "" || password === null){
            hashedPassword = user.password;
        }else{
            hashedPassword = await argon2.hash(password);
        }
        if(password !== confPassword)return res.status(400).json({message: "Password not match"});
        try{
            await user.update({
                name: name,
                username: username,
                password: hashedPassword,
                role: role
            });
            res.status(200).json({message: "User updated successfully"});
        }catch (error) {
            res.status(400).json({message: error.message});
        }
            
   
        
};
export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({message: "User not found"});
    
    try{
        await user.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({message: "User deleted successfully"});
    }catch (error) {
        res.status(400).json({message: error.message});
    }
};