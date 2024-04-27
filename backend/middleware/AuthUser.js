// import User from '../models/UserModel.js';


// export const verifyUser = async (req, res, next) => {
//     if(!req.session.userId) {
//         return res.status(401).json({message: 'Unauthorized'});
//     }
//     const user = await User.findOne({
//         where: {
//             uuid: req.session.userId
//         }});
//         if(!users) 
//             return res.status(404).json({message: 'User not found'});
//         req.userId = users.id;
//         req.role = users.role;
//         next();
        
//     }

// export const adminOnly = async (req, res, next) => {
//     const users = await User.findOne({
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if(!users) 
//         return res.status(404).json({message: 'User not found'});
//     if(users.role !== 'admin') return res.status(403).json({message: 'Forbidden'});
//     next();
// }

// const jwt = require('jsonwebtoken');

// function checkAuth(req, res, next){
//     try{
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.userData = decodedToken;
//         next();
//     }catch(e){
//         return res.status(401).json({
//             message: 'Auth failed',
//             'error': e        
//         });
//     }
// }

// module.exports = {
//     checkAuth: checkAuth
// }