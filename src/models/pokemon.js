const validTypes = ["Feu", "Plante", "Eau", "poison", "Vol", "Normal", "Insecte", "Electrick", "Fée"]

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
                unique: {
                    msg: "Le nom est déjà utilisé !"
                },
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
                },
                validate: {
                    isTypesValid(value){ //isTypesValid est un nom arbitraire donnée à la fonction
                        if(!value) {
                            throw new Error("Un pokémon doit avoir au moins un types !")
                        }
                        if(value.split(',').length > 3) {
                            throw new Error("Un pokémon ne peut pas avoir plus de trois types !")
                        }

                        value.split(",").forEach(type => {
                            if(!validTypes.includes(type)) {
                                throw new Error(`Le type du pokémon n'est pas connu ! il doit appartenir à la liste suivante ${validTypes}`)    
                            }
                        })
                    }
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


//Les validateurs