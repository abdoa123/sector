const db = require("../model");
const ApiError = require("../error/ApiError");
const { Area , Central , Sector} = require("../model");
const central = require("../model/central");

// 📌 Create and Save a new Central
const createCentral = async (req, res, next) => {
  try {
    // Get input data
    const { name, areaId } = req.body;

    // Check if sectorId is provided
    if (!areaId) {
      return res.status(400).json({ message: "sectorId is required" });
    }

    // Create new Central
    const newCentral = await Central.create({ name, areaId });

     // response with the input data
     res.send({
        newCentral
      });
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};
// Get Areas by Areas ID
const getCentraByAreas = async (req, res, next) => {
    try {
      const { areaId } = req.query;
  
      if (!areaId) {
        return res.status(400).json({ message: "areaId is required" });
      }
  
      const areas = await Central.findAll({
        where: { areaId },
        include: [
          {
            model: Area,
            as: "area",
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
// 📌 Retrieve all Centrals from the database
const getAllCentrals = async (req, res, next) => {
  try {
    const Centrals = await Central.findAll({
        include: [
          {
            model: db.Area, // Include Area model
            as: "area", // Alias must match the one in the association
            attributes: ["id", "name"], // Fetch only necessary fields
            include: [
              {
                model: db.Sector, // Include Sector related to the Area
                as: "sector",
                attributes: ["id", "name"], // Fetch Sector fields
              },
            ],
          },
        ],
      });
      
  
    // Respond with data
    res.status(200).json(Centrals);
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};

// 📌 Update an Central by ID
const updateCentral = async (req, res, next) => {
  try {
    const { id, name, sectorId } = req.body;

    // Update the Central
    const [updated] = await Central.update({ name, sectorId }, { where: { id } });

    if (updated) {
      res.json({ message: "Central updated successfully." });
    } else {
      res.status(404).json({ message: "Central not found" });
    }
  } catch (err) {
    console.error(err);
    next(ApiError.internal());
  }
};

module.exports = { createCentral, getAllCentrals, updateCentral,getCentraByAreas };
