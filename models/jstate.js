const Sequelize = require('sequelize');

module.exports = class Jstate extends Sequelize.Model {
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
            modelName: 'Jstate',
            tableName: 'jstates',
            paranoid: false, // createdAt, updatedAt, deletedAt 생성(true)
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Jstate.hasMany(db.Job, {foreignKey:'stateId', sourceKey: 'id'});
    };
};