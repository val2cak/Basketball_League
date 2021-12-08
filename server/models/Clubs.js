module.exports = (sequelize, DataTypes) => {
    const Clubs = sequelize.define("Clubs" , {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logoId: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    });

    Clubs.associate = (models) => {
        Clubs.hasMany(models.Players, {
          onDelete: "cascade",
        });
      };

    return Clubs;
    
};