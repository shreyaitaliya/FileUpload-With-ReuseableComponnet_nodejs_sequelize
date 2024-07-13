module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.TEXT
        },
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            // allowNull: false,
            type: DataTypes.TEXT
        },
        phonenumber: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        },
        AddedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        LastModifiedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    }, {
        timestamps: false,
    });
    return User;
};
