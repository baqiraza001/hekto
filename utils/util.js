const moment = require("moment/moment");
const jwt = require("jsonwebtoken")

const createJWTToken = (user, expTimeInHours = 6) => {
    const payload = {
        uid: user._id,
        iat: moment().unix(),
        exp: moment().add( expTimeInHours, "hours").unix(),
        claims: {
          // addional informations can be added here
          email: user.email
        }
      }
      const myPromise = new Promise((resolve, reject) => {
          jwt.sign(payload, process.env.JWT_ENCRYPTION_KEY, (err, token) => {
            if(err)
                reject(err)
            resolve(token)
          })
      })
      return myPromise
}


const isSuperAdmin = (user) => {
  return((user.type == process.env.USER_TYPE_SUPERADMIN))
}
const isAdmin = (user) => {
  return((user.type == process.env.USER_TYPE_ADMIN))
}

module.exports = {
    createJWTToken,
    isSuperAdmin,
    isAdmin
}