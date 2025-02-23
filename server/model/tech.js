module.exports = (sequelize, Sequelize) => {
    const Tech = sequelize.define("Tech", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      issueType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capelNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capenaNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      baxNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  
    return Tech;
  };
  