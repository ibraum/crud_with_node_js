module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: {
                    msg: 'Le username doit être unique'
                }
            },
            password: {
                type: DataTypes.STRING,
                //encryptage du mot de passe

            }
        }
    )
}