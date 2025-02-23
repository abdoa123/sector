const db = require("../model");
const ApiError = require("../error/ApiError");
const { Area,Sector } = require("../model");

// 📌 Create and Save a new Area
const createArea = async (req, res, next) => {
  try {
    // Get input data
    const { name, sectorId } = req.body;

    // Check if sectorId is provided
    if (!sectorId) {
      return res.status(400).json({ message: "sectorId is required" });
    }

    // Create new Area
    const newArea = await Area.create({ name, sectorId });

     // response with the input data
     res.send({
        newArea
      });
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};
// Get Areas by Sector ID
const getAreasBySector = async (req, res, next) => {
    try {
      const { sectorId } = req.query;
  
      if (!sectorId) {
        return res.status(400).json({ message: "sectorId is required" });
      }
  
      const areas = await Area.findAll({
        where: { sectorId },
        include: [
          {
            model: Sector,
            as: "sector",
            attributes: ["id", "name"], // Include sector details
          },
        ],
      });
  
      res.json(areas);
    } catch (error) {
      console.error("Error fetching areas:", error);
      next(ApiError.internal());
    }
  };
// 📌 Retrieve all Areas from the database
const getAllAreas = async (req, res, next) => {
  try {
    const areas = await Area.findAll({
        include: [
          {
            model: db.Sector, // Include Sector model
            as: "sector", // Alias defined in the association
            attributes: ["id", "name"], // Specify which fields to retrieve
          },
        ],
      });
  
    // Respond with data
    res.status(200).json(areas);
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};

// 📌 Update an Area by ID
const updateArea = async (req, res, next) => {
  try {
    const { id, name, sectorId } = req.body;

    // Update the Area
    const [updated] = await Area.update({ name, sectorId }, { where: { id } });

    if (updated) {
      res.json({ message: "Area updated successfully." });
    } else {
      res.status(404).json({ message: "Area not found" });
    }
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};

module.exports = { createArea, getAllAreas, updateArea,getAreasBySector };
