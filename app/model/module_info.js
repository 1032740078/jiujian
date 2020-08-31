'use strict';
// const ModuleType = require('./module_type.js')
module.exports = app => {
    const {INTEGER, STRING, DATE, NOW, TEXT} = app.Sequelize;
    /** 模块表 */
    const ModuleInfo = app.model.define('module_info', {
        id: {type: INTEGER, autoIncrement: true, primaryKey: true, comment: '模块id'},
        module_name: {type: STRING, comment: '模块名'},
        module_file: {type: STRING, comment: '模块文件地址,json文件'},
    });

    // /** 获取 username ,如果存在,则返回 对象,否则返回 null*/
    // Users.getUserName = async function(userName) {
    //   return await this.findOne({
    //     where: {
    //       users_name: userName,
    //     },
    //   });
    // };

    ModuleInfo.associate = () => {
        // 与 ModuleType 存在一对多关系
        app.model.ModuleInfo.hasOne(app.model.ModuleType, {foreignKey: 'module_id'});
    }

    // ModuleInfo.hasMany(ModuleType, {as: 'Workers'}) //方式一

    return ModuleInfo;
};
