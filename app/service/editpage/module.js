'use strict';
const Service = require('egg').Service;

/*编辑页-模块*/
class TopicService extends Service {
    /** 新建 */
    async create(data) {
        return {contents: '', message: '', status: ''}
    }

    /** 查询 */
    async inquire(data) {
        return {contents: '', message: '', status: ''}
    }

    /** 更新 */
    async update(data) {
        return {contents: '', message: '', status: ''}
    }

    /** 删除 */
    async delete(data) {
        return {contents: '', message: '', status: ''}
    }

}

module.exports = TopicService;
