module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define("Sectors", {
        name: {
            type: DataTypes.STRING,
        },
    });
  
    return Sector;
  };
