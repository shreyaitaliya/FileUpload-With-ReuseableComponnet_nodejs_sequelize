module.exports = (sequelize, DataTypes) => {
    const history_attribute = sequelize.define('history_attribute', {
        attributehistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        attributeID: {
            type: DataTypes.INTEGER,
            // primaryKey: true,   
        },
        attributename: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.TEXT
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        image: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        AddedBy: {
            type: DataTypes.STRING(50)
        },
        AddedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        LastModifiedBy: {
            type: DataTypes.STRING(50)
        },
        LastModifiedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    }, {
        timestamps: false,
    });
    return history_attribute;
};
