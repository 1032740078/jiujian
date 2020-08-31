'use strict';
// module.exports = app => {
//
// };

class AppBootHook {
    constructor(app) {
        this.app = app;
    }


    /** 此时 config 文件已经被读取并合并，但是还并未生效.这是应用层修改配置的最后时机.注意：此函数只支持同步调用*/
    // configWillLoad() {
    //
    // }


    /** 所有的配置已经加载完毕,可以用来加载应用自定义的文件，启动自定义的服务 */
    // async didLoad() {
    //
    // }


    /** 所有的插件都已启动完毕，但是应用整体还未 ready,可以做一些数据初始化等操作，这些操作成功才会启动应用,例如：从数据库加载数据到内存缓存 */
    // async willReady() {
    //
    //
    //
    //
    // }


    /** 应用已经启动完毕 */
    async didReady() {
        /** 生成数据库表 */
        const ctx = await this.app.createAnonymousContext();
        const GenerateDatabaseTables = true;// <==true 生成数据库,false则不生成
        if (GenerateDatabaseTables) {
            if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
                this.app.beforeStart(async () => {
                    // 生成数据结构
                    await this.app.model.sync({force: true});
                });
            }
        }
    }


    /** http / https server 已启动，开始接受外部请求,此时可以从 app.server 拿到 server 的实例 */
    async serverDidReady() {
    }

    // async helloword() {
    //   console.log('123');
    // }

}

module.exports = AppBootHook;
