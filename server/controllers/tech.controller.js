const db = require("../model");
const ApiError = require("../error/ApiError");
const { Tech,Central } = require("../model");

// Create a new Tech record
const createTech = async (req, res, next) => {
  try {
    const { orderNumber, issueDate, issueType, companyName,capelNum, capenaNum, baxNumber, endDate, centralId } = req.body;

    // Check if the central exists
    const central = await Central.findByPk(centralId, {
      include: [
        {
          model: db.Area,
          as: "area",
          include: [{ model: db.Sector, as: "sector" }],
        },
      ],
    });

    if (!central) {
      return next(ApiError.badRequest("Central not found"));
    }

    const newTech = await Tech.create({
      orderNumber,
      issueDate,
      issueType,
      capelNum,
      capenaNum,
      baxNumber,
      endDate,
      centralId,
      companyName
    });

    // Add area and sector details manually
    const responseTech = {
      ...newTech.toJSON(),
      central: {
        id: central.id,
        name: central.name,
        area: {
          id: central.area.id,
          name: central.area.name,
          sector: {
            id: central.area.sector.id,
            name: central.area.sector.name,
          },
        },
      },
    };

    res.status(201).json(responseTech);
  } catch (error) {
    console.error("Error creating tech:", error);
    next(ApiError.internal());
  }
};

// Get all Techs with related Central, Area, and Sector
const getAllTechs = async (req, res, next) => {
  try {
    const techs = await Tech.findAll({
      include: [
        {
          model: Central,
          as: "central",
          include: [
            {
              model: db.Area,
              as: "area",
              include: [{ model: db.Sector, as: "sector" }],
            },
          ],
        },
      ],
    });

    res.status(200).json(techs);
  } catch (error) {
    console.error("Error fetching techs:", error);
    next(ApiError.internal());
  }
};

module.exports = {
  createTech,
  getAllTechs,
};
