import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: 'db',
    dialect: 'mysql', // Specifies MySQL dialect
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
});

console.log(process.env.DB_NAME, '....................>>>>>>>...', process.env.DB_USER, process.env.DB_PASSWORD);


// Test connection


sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

export default sequelize;
