const jwt = require("jsonwebtoken");
const TokenExpiredError = jwt.TokenExpiredError;
const config = process.env;
const {user} = require('../../model')
module.exports = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  //check if token 
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }


  try {
  //decode the token to check authentication
    const decoded =  jwt.verify(token, config.TOKEN_KEY);
    if (req.session.cookie) {
      req.user = decoded;
      req.session.touch(); 
      //if every thing is okey
      return next();
    }
    else {
      //user has the token but not has the cookie
      res.status(500).send({
        message:
          "User Is Not authenticated" + req.session.isAuth
      });
    }

  } catch (err) {
    //if token is expired then refresh it
    if (err instanceof TokenExpiredError) {
      //find user to refresh token
      const getUser =await user.findOne({
        where: { token: token }
      })
      //if very old token 
      if(!getUser){
        return res.status(408).send("please login again");
      }
      // new token
      let newtoken  =  jwt.sign(
        { userId: getUser.id, userName : getUser.userName },
        process.env.TOKEN_KEY,
        {
            expiresIn: '1h'
          }
    );
    //update user token
      const User =await user.update({token:newtoken}, {
        where: { token: token }
      })

      return res.status(406).send({"newToken":newtoken});
    }
    
    
    return res.status(401).send("Invalid Token");
  }

};
