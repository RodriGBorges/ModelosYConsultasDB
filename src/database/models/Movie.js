module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    let alias = 'movies';
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
            type: DataTypes.DECIMAL(10, 2),
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
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
    };
    let config = {
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as:'Generos',
            foreignKey: 'genre_id'
        })
    }
=======
    const Movie = sequelize.define(
        'movies',
        {
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
                type: DataTypes.DECIMAL(10, 2),
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
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
        },
        {
            timestamps: false
        }
    )
>>>>>>> ManipulacionDeDatos

    return Movie
};