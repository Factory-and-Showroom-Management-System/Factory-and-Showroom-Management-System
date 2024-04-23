import { Sequelize } from "sequelize";

const db =  new Sequelize('pfmsdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;