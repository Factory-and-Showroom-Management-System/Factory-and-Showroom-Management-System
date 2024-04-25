// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import SequelizeStore from 'connect-session-sequelize';
// import db from './config/Database.js';
// import UserRoute from './routes/UserRoute.js';
// import ProductRoute from './routes/ProductRoute.js';
// import AuthRoute from './routes/AuthRoute.js';

// dotenv.config();

// const app = express();

// const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({
//     db: db

// });

// // (async() => {
// //     await db.sync();
// // })();

// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: { secure: 'auto'}
// }));

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
//   }));
// app.use(express.json());
// app.use(UserRoute);
// app.use(ProductRoute);
// app.use(AuthRoute);

// //store.sync();

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });


const http = require('http');
const app = require('./app');
const port = 3000;

const server = http.createServer(app);

server.listen(port);

