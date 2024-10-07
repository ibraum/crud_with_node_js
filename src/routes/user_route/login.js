const {userFactory} = require("../../db/sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        console.log("---------------------" + req.body.username);
        
        userFactory.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }

            bcrypt.compare(req.body.password, user.password)
            .then(isValid => {
                if (isValid) {
                    const token = jwt.sign(
                        {userId: user.id},
                        privateKey,
                        {expiresIn: '24h'}
                    )
                    const message = `L'utilisateur ${user.username} est connecté avec succès ! `;
                    return res.json({ message, data: user, token });
                } else {
                    return res.status(401).json({ message: "Mot de passe incorrect." });
                }
            })
            .catch(err => {
                return res.status(500).json({ message: "Erreur lors de la vérification du mot de passe.", error: err });
            });
        })
        .catch(err => {
            return res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur.", error: err });
        });
    });
}