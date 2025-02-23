module.exports = (sequelize, DataTypes) => {
    const Areas = sequelize.define("Areas", {
        name: {
            type: DataTypes.STRING,
        },
    });
  
    return Areas;
  };
