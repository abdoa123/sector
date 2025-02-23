module.exports = (app, cors) => {
    const sector = require("../controllers/central.controller");
    const apiErrorHandler = require('../error/api-error-handler');

    var router = require("express").Router();

    // Create a new governorate
    router.post("/central",sector.createCentral);
    
  
    // Retrieve all governorate
    router.get("/central", sector.getAllCentrals);

    // Update a governorate with id
    router.put("/updateGovernorate", sector.updateCentral);
    router.get("/", sector.getCentraByAreas);

    router.use(apiErrorHandler);

    app.use('/api/centrals', cors(), router);
  };