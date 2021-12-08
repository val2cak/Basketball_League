module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts" , {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pictureId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Posts;
    
};