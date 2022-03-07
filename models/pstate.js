const Sequelize = require('sequelize');

module.exports = class Pstate extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: false, // createdAt, updatedAt, deleteAt 생성(true)
            underscored: false, 
            modelName: 'Pstate',
            tableName: 'pstates',
            paranoid: false, // createdAt, updatedAt, deletedAt 생성(true)
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Pstate.hasMany(db.Project, {foreignKey:'stateId', sourceKey: 'id'});
    };
};