const db = require("../model");
const Op = db.Sequelize.Op;
const crypto = require("crypto");
const ApiError = require('../error/ApiError');
const {  Sector } = require("../model");


// Create and Save a new Sector
const createSector = async (req, res, next) => {
  try {
    // get input data 
    const { name } = req.body;
   

    // create new Sector
    const addSector = await Sector.create({
        name
    })
    // response with the input data
    res.send({
      addSector
    });

  } catch (err) {
    next(ApiError.internal());
        return;
  }

}

// Retrieve all Sector from the database.
const getAllSector = async (req, res, next) => {
  try {
    // get all Sector
    const getAll = await Sector.findAll({
    
    })

    //response with data 
    res.send(getAll);

  } catch (err) {
    console.log(err);
    
    next(ApiError.internal());
    return;
  }
};

// Update a Sector by the id in the request
const update = async (req, res, next) => {
  try {
    const id = req.body.id;
    const updateSector = await Sector.update(req.body, {
      where: { id }
    })
    if (updateSector == 1) {
      res.send({
        message: "Sector was updated successfully."
      });
    } else {
      next(ApiError.internal());
      return;
    }
    
  } catch (err) {
    next(ApiError.internal());
    return;
  };
};





module.exports = {
  update, getAllSector, createSector
}