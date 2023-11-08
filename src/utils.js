const jwt = require("jsonwebtoken")
const TOKEN_SECRET = "CODER_TOKEN"

module.exports.createAccessToken = function(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}





