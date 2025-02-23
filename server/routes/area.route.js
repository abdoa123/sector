module.exports = (app, cors) => {
    const sector = require("../controllers/area.controller");
    const apiErrorHandler = require('../error/api-error-handler');

    var router = require("express").Router();

    // Create a new governorate
    router.post("/areas",sector.createArea);
    
  
    // Retrieve all governorate
    router.get("/areas", sector.getAllAreas);

    // Update a governorate with id
    router.put("/updateGovernorate", sector.updateArea);
    router.get("/", sector.getAreasBySector);

    router.use(apiErrorHandler);

    app.use('/api/areas', cors(), router);
  };