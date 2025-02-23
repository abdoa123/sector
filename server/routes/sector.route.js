module.exports = (app, cors) => {
    const sector = require("../controllers/sector.controller");
    const apiErrorHandler = require('../error/api-error-handler');

    var router = require("express").Router();

    // Create a new governorate
    router.post("/sectors",sector.createSector);
    
  
    // Retrieve all governorate
    router.get("/sectors", sector.getAllSector);

    // Update a governorate with id
    router.put("/updateGovernorate", sector.update);
  
    router.use(apiErrorHandler);

    app.use('/api/sectors', cors(), router);
  };