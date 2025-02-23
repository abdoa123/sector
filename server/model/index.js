require('dotenv').config()
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: 'mysql',
  operatorsAliases: false,
  options:{
    dialectOptions: {
      /* useUTC: true, **deprecated** */ 
      timezone: 'utc'
   }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//user model;
db.Sector = require("./sectors.js")(sequelize, Sequelize)
db.Area = require("./arae.js")(sequelize, Sequelize)
db.Central = require("./central.js")(sequelize, Sequelize);

// One Sector has many Areas
db.Sector.hasMany(db.Area, { foreignKey: "sectorId", as: "areas" });

// Each Area belongs to one Sector
db.Area.belongsTo(db.Sector, { foreignKey: "sectorId", as: "sector" });

db.Area.hasMany(db.Central, { foreignKey: "areaId", as: "centrals" }); // Area has multiple Centrals
db.Central.belongsTo(db.Area, { foreignKey: "areaId", as: "area" }); // Central belongs to one Area
db.Tech = require("./tech.js")(sequelize, Sequelize);

// A Central has many Techs
db.Central.hasMany(db.Tech, { foreignKey: "centralId", as: "techs" });

// A Tech belongs to one Central
db.Tech.belongsTo(db.Central, { foreignKey: "centralId", as: "central" });

module.exports = db;