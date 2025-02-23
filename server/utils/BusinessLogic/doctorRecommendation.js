const { Op, Sequelize } = require('sequelize'); // Assuming Sequelize is available in your project

const getDoctorRecommendations = async (recommendationTable, recommendationColumn, DoctorId, joinedTable, joinedColumnName) => {
  try {
    const limit = 10;

    // Check if there are joining tables or not
    if (joinedTable !== undefined) {
      // Case with joining tables
      const recommendationsWithJoin = await recommendationTable.findAll({
        where: {
          DoctorId,
          deleted: false,
        },
        attributes: [
          recommendationColumn,
          [Sequelize.fn('COUNT', Sequelize.col(recommendationColumn)), 'Frequency'],
          [Sequelize.col(joinedColumnName), joinedColumnName],
        ],
        include: [{
          model: joinedTable,
          attributes: ['name'],
        }],
        group: [recommendationColumn, joinedColumnName],
        order: [[Sequelize.literal('Frequency'), 'DESC']],
        limit,
      });

      return recommendationsWithJoin;
    } else {
      // Case without joining tables
      const recommendationsWithoutJoin = await recommendationTable.findAll({
        where: {
          DoctorId,
          deleted: false,
          [recommendationColumn]: { [Op.ne]: null },
        },
        attributes: [
          recommendationColumn,
          [Sequelize.fn('COUNT', Sequelize.col(recommendationColumn)), 'Frequency'],
        ],
        group: [recommendationColumn],
        order: [[Sequelize.literal('Frequency'), 'DESC']],
        limit,
      });

      return recommendationsWithoutJoin;
    }
  } catch (err) {
    // Log and handle the error
    console.log(err);
    throw err;
  }
};

module.exports = { getDoctorRecommendations };