'use strict';

module.exports = app => {
    const {INTEGER, STRING, DATE, NOW, TEXT, UUID} = app.Sequelize;
    /** 模块表 */
    const ModuleType = app.model.define('module_type', {
        id: {type: INTEGER, autoIncrement: true, primaryKey: true, comment: '模块id'},
        module_type_name: {type: STRING, comment: '模块类型名'},
        module_id: {type: INTEGER, comment: '模块类型名'},
    });

    ModuleType.associate = () => {
        // 与 ModuleInfo 存在一对多关系
        app.model.ModuleType.belongsTo(app.model.ModuleInfo, {
            foreignKey: 'module_id',//外键
            targetKey: 'id'//目标键
        });
    }
    return ModuleType;
};
