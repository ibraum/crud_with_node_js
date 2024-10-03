module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Pokemon',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: "Le nom ne doit pas être vide !"},  // Utilisation correcte de notEmpty
                    notNull: {msg: "Le nom ne doit pas être nul !"},
                    len: {
                        args: [1, 25], // Combine min et max avec len pour la longueur des caractères
                        msg: "Le nom doit contenir entre 1 et 25 caractères !"
                    }
                }
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {msg: "Les points de vie doivent être un entier !"},
                    max: {
                        args: [999],
                        msg: "Les points de vie doivent être inférieurs ou égaux à 999."
                    },
                    min: {
                        args: [0],
                        msg: "Les points de vie doivent être supérieurs ou égaux à 0."
                    }
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {msg: "Les points de combat doivent être un entier !"},
                    notNull: {msg: "Les points de combat ne doivent pas être nuls !"},
                    max: {
                        args: [99],
                        msg: "Les points de combat doivent être inférieurs ou égaux à 99."
                    },
                    min: {
                        args: [0],
                        msg: "Les points de combat doivent être supérieurs ou égaux à 0."
                    }
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: {msg: "L'URL de l'image n'est pas valide !"},
                    notNull: {msg: "L'URL de l'image ne doit pas être nulle !"}
                }
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    this.setDataValue('types', types.join())
                }
            }
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: "updated"
        }
    )
}
