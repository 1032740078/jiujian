'use strict';

const Service = require('egg').Service;
//https://github.com/apocas/dockerode#readme
const Docker = require('dockerode');
const docker = new Docker({host: 'http://192.168.1.7', port: 2375});

class TopicService extends Service {
    /** home */
    async index(data) {
        // const res = await docker.listContainers({all: 1});

        const transaction = await this.app.model.transaction();
        try {
            // 新建机构
            await this.app.model.ModuleInfo.create({
                module_name: '123',
                module_file: '123',
            }, { transaction });

            // 提交事务
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            // 事务失败,回滚
            await transaction.rollback();
            return false;
        }

    }


}

module.exports = TopicService;
