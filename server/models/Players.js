module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players" , {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Players;
    
};