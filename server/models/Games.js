module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("Games" , {
        firstClub: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondClub: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gameScore: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0 : 0"
        },
    });

    return Games;
    
};