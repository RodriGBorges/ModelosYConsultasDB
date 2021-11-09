module.exports = (sequelize, DataTypes) => {
    let alias = 'Actor';
    let cols = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            favorite_movie_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 'No tiene'
            }
        };
    let config = {
            timestamps: true,
            createdAt: 'created_at',
            updateAt: 'updated_at',
            deletedAt: false
        }
        const Actor = sequelize.define(alias, cols, config);

        Actor.associate = (models) => {
            Actor.belongsToMany(models.Movie, {
                as: 'Movies',
                through: 'actor_movie',
                foreignKey: 'actor_id',
                otherKey: 'movie_id',
                timestamps: false
            })
        }

        return Actor
}