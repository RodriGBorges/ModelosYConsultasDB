module.exports = (sequelize, DataTypes) => {
    let alias = 'Genre';
    let cols = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            ranking: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: '1'
            }
        };
    let config = {
        tableName: 'genres',
        timestamps: true,
        underscored: true
    }
    const Genre = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, {
            as: 'Movies',
            foreignKey: 'genre_id'
        })
    }

    return Genre
}