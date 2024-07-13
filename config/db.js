const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Multiple_Form_master', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('DB Is Connected...');
    })
    .catch((error) => {
        console.log(error);
        return false;
    });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.UserModel = require('../models/usermodel')(sequelize, DataTypes);
db.AttributeModel = require('../models/attributemode')(sequelize, DataTypes);
db.history_attributeModel = require('../models/historyAttributemodel')(sequelize, DataTypes);

db.sequelize.sync().then(() => {
    console.log('RE-SYNC...');
});

module.exports = db;
