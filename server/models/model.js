const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "password", {
    dialect: "postgres",
    logging : false
});

const Abonent = sequelize.define("abonent", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
});

const Counter = sequelize.define("counter", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Abonent.hasMany(Counter);

module.exports = {
    sequelize,
    Abonent,
    Counter
}