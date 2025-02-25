const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const apiErrorHandler = require('./error/api-error-handler');
var passport = require('passport');
const app = express();
const session = require("express-session");
var cookieParser = require('cookie-parser');
require("dotenv").config()



async function initializeApp() {
  

  



var whitelist = ['https://www.medcloudeg.com','https://xecuteit.co', 'https://medcloudeg.com', 'http://localhost:3006','http://localhost:3000']

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // console.log(origin, "adafafa")
    if (whitelist.indexOf(origin) !== -1|| !origin) {
      callback(null, true)
    } else {
      callback(null, true)    }
  }
}


app.use((req, res, next) => {
  // console.log("afabnjafnbfajnh")
  res.setHeader('Access-Control-Allow-Origin',  "*");
  res.setHeader('Access-Control-Allow-Methods', "*");
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});







// parse requests of content-type - application/x-www-form-urlencoded
//call the db
const db = require("./model");



//  db.sequelize.sync({ force: true });
db.sequelize.sync({alter:true}).catch(err=>{
  console.log(err);
});
app.use(cookieParser('lifeless-secret-01890'));


        
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', function(req, res){
  res.json({message:"Healthy"})
})
require("./routes/sector.route")(app, () => cors(corsOptions));
require("./routes/area.route")(app, () => cors(corsOptions));
require("./routes/central.route")(app, () => cors(corsOptions));
require("./routes/tech.route")(app, () => cors(corsOptions));


//app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'front/build/index.html')));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

 
}
initializeApp()
  .then(() => {
    // Your server is now ready to start
   
    module.exports = app;
  })
  .catch((err) => {
    console.error("Error initializing the app:", err);
  });
