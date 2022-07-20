const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://iizdtckv:dosh9fjkGoTZ1HpDmK0MtCtAbkGKtpBM@balarama.db.elephantsql.com/iizdtckv'); // Для `postgres`
sequelize.sync();
module.exports = sequelize;
