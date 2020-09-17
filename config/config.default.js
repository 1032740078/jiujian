/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1563332133292_5420';

    /** sequelize mysql*/
    // config.sequelize = {
    //     /** *************** 服务器 *****************/
    //     dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    //     database: 'jiujian',
    //     host: '192.168.1.12',
    //     // host: 'localhost',
    //     port: 3306,
    //     username: 'jiujian',
    //     password: 'S23Y328cSz3btEeX',
    //
    //
    //     define: { // model的全局配置
    //         timestamps: true, // 添加create,update,delete时间戳
    //         paranoid: true, // 添加软删除
    //         freezeTableName: true, // 防止修改表名为复数
    //         underscored: false, // 防止驼峰式字段被默认转为下划线
    //     },
    //     timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    //     // 连接数 = ((核心数 * 2) + 有效磁盘数)
    //     pool: {// 连接池
    //         // max: 6,
    //         min: 3,
    //         acquire: 30000,
    //         idle: 100000,
    //     },
    //     // dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
    //     //   dateStrings: true,
    //     //   typeCast(field, next) {
    //     //     if (field.type === 'DATETIME') {
    //     //       return field.string();
    //     //     }
    //     //     return next();
    //     //   },
    //     // },
    //
    // };


    /** redis */
    // config.redis = {
    //     clients: {
    //         jiujian: {                 // instanceName. See below
    //             port: 6379,          // Redis port
    //             host: '192.168.1.12',   // Redis host
    //             password: '123456',
    //             db: 0,
    //         },
    //         // bar: {
    //         //     port: 6379,
    //         //     host: '127.0.0.1',
    //         //     password: 'auth',
    //         //     db: 1,
    //         // },
    //     }
    // };

    /** csrf */
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
    };

    /** cors */
    config.cors = {
        origin: '*',
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    /** 在这里添加中间件配置 */
    config.middleware = ['errorHandler'];

    /** 在这里添加用户配置 */
    const userConfig = {
        // myAppName: 'egg',
    };

    /** egg-socket.io */
    config.io = {
        init: {}, // passed to engine.io
        namespace: {
            '/': {
                connectionMiddleware: [],
                packetMiddleware: [],
            },
            '/example': {
                connectionMiddleware: [],
                packetMiddleware: [],
            },
        },
    };

    /** jwt */
    config.jwt = {
        secret: 'gonghui20190729',
    };


    /** multipart 文件上传 */
    config.multipart = {
        whitelist: [// 文件白名单
            // images
            '.jpg', '.jpeg', // image/jpeg
            '.png', // image/png, image/x-png
            // '.gif', // image/gif
            // '.bmp', // image/bmp
            // '.wbmp', // image/vnd.wap.wbmp
            // '.webp',
            // '.tif',
            // '.psd',
            // // text
            // '.svg',
            // '.js', '.jsx',
            // '.json',
            // '.css', '.less',
            // '.html', '.htm',
            // '.xml',
            // // tar
            // '.zip',
            // '.gz', '.tgz', '.gzip',
            // // video
            // '.mp3',
            // '.mp4',
            // '.avi',
        ],
    };

    // 自定义配置
    config.custom = {};


    return {
        ...config,
        ...userConfig,
    };
};
