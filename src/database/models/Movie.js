module.exports = (sequelize, DataTypes) => {
    let alias = 'Movie';
    let cols = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            awards: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: '0'
            },
            release_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            length: {
                type: DataTypes.INTEGER
            },
            genre_id: {
                type: DataTypes.INTEGER
            }
        };
    let config = {
            tableName: 'movies',
            timestamps: true
        };
    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id'
        })

        Movie.belongsToMany(models.Actor, {
            as: 'Actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }


    return Movie
};