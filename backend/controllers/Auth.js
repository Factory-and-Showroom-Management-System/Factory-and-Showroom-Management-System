import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({message: "User not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({message: "Incorrect password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const username = user.username;
    const role = user.role;
    res.status(200).json({uuid, name, username, role});
}

export const Me = async (req, res) => {
    if(!req.session.userId) {
    return res.status(401).json({message: "Unauthorized"});
    }  
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'username', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({message: "User not found"}); 
    res.status(200).json(user);
}


export const Logout = async (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({message: "Something went wrong"});
        res.status(200).json({message: "Logout successful"});
    });
}