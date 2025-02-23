const jwt = require("jsonwebtoken");
const TokenExpiredError = jwt.TokenExpiredError;
const config = process.env;
const {PatientToken, LastPatientToken} = require('../../model')
const getClientIP = require("../../middleWare/authintication/getClientIP");

module.exports = async (req, res, next) => {
  const clientIp = getClientIP(req)
  const referer = req.headers['x-requested-url']
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  let { PatientId } = req.params 
  if (!PatientId) PatientId = req.body.PatientId

  try {
    if (token) {
        //decode the token to check authentication
        var decoded = jwt.verify(token, process.env.TOKEN_KEY);
        let getToken = await PatientToken.findOne({ where: { userId: decoded.userId , PatientId:PatientId, IsCancelled: false }, order: [ [ 'createdAt', 'DESC' ]] })
        const lastToken = await LastPatientToken.findOne({where:{userId: decoded.userId , PatientId:PatientId}})
        if (lastToken) req.pinDate = lastToken.date
        else req.pinDate = null
        if (getToken) {
          const CheckToken = jwt.verify(getToken.token, process.env.TOKEN_KEY);
          req.isVaild = true;

        //if every thing is okey
        return next();
      }
      else {
        //user not have not cancelled token
        req.isVaild = false;
        return next();

      }
    } else if (clientIp) {
      if (referer && referer.includes('/')) {
        const split = referer.split('/')
        req.isEmergency = split[split.length - 1] == 'Emergency'
      }
      let getToken = await PatientToken.findOne({ where: { ip: clientIp, PatientId:PatientId, IsCancelled: false }, order: [ [ 'createdAt', 'DESC' ]] })
        if (getToken) {
          const CheckToken = jwt.verify(getToken.token, process.env.TOKEN_KEY);
          req.isVaild = true;

        //if every thing is okey
        return next();
      } else {
        //user not have not cancelled token
        req.isVaild = false;
        return next();
    }
    } else {
        //user not have not cancelled token
        req.isVaild = false;
        return next();
    }


  } catch (err) {
    //if token is expired then refresh it
    if (err instanceof TokenExpiredError) {
      //find user to refresh token
      if (token) {
        PatientToken.destroy({ where: { userId: decoded.userId , PatientId:PatientId } })
      } else if (clientIp){
        PatientToken.destroy({ where: { ip: clientIp , PatientId:PatientId } })

      }
      req.isVaild = false;
      return next();


      } else {
        req.isVaild = false;
  
        return next();
      }
     
    
    } 
    
    
  }
