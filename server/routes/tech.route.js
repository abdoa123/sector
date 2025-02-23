
module.exports = (app, cors) => {
    const sector =require("../controllers/tech.controller");
    const apiErrorHandler = require('../error/api-error-handler');

    var router = require("express").Router();

    // Create a new governorate
    router.post("/tech",sector.createTech);
    
  
    // Retrieve all governorate
    router.get("/tech", sector.getAllTechs);


  
    router.use(apiErrorHandler);

    app.use('/api/techs', cors(), router);
  };