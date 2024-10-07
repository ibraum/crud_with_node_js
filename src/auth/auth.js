const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')


module.exports = (req, res, next) => {
const authorizationHeaders = req.headers.authorization

    if(!authorizationHeaders) {
        message = 'Le token est manquant'
        return res.status(401).json({message})
    }

    const token = authorizationHeaders.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = "Vous n'êtes pas autorisé à accéder à cette ressource. "
        }

        const userId = decodedToken.userId
        console.log("userId -------------------" + userId)
        if(req.body.userId !== userId) {
            const message = "Identifiant invalide !"
            res.status(401).json({message})
        }else{
            next()
        }
    })
}