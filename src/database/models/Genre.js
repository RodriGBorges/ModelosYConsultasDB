const { Datatypes } = require("sequelize/types");

module.exports = (sequelize, Datatypes) => {
    const Genre = sequelize.define(
        'genres',
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true
            },
            ranking: {
                type: Datatypes.INTEGER,
                allowNull: false,
                unique: true
            },
            active: {
                type: Datatypes.BOOLEAN,
                allowNull: false,
                defaultValue: '1'
            }
        },
        {
            timestamps: false
        }
    )
    return Genre
}