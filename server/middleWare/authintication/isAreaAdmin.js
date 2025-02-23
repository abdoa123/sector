const jwt = require("jsonwebtoken");
const TokenExpiredError = jwt.TokenExpiredError;
const config = process.env;
const {AreaAdmin} = require('../../model')
module.exports = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  //check if token 
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
    //decode the token to check authentication
  const decoded =  jwt.verify(token, config.TOKEN_KEY);

  // if 
  if(decoded.roleId === 27) {
      let getAreaAdmin = await AreaAdmin.findOne({
          where: { userId: decoded.userId }
      })
      if(getAreaAdmin) {
          req.areaAdmin = getAreaAdmin
          req.isAreaAdmin = true;
      }
      next()
  }else if(decoded.roleId === 21) {
    next()
  } else {
    return res.status(401).send("Un authorized");
  }
    
};
