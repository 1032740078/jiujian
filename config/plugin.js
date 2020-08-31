'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg

  /**
   * 静态文件
   * @member {Function} Plugin#mysql
   * @property {Boolean} enable - `true` by default
   */
  static: {
    enable: true,
  },


  /**
   * mysql 插件
   * @member {Function} Plugin#mysql
   * @property {Boolean} enable - `true` by default
   */
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  /**
   * sequelize 插件
   * @member {Function} Plugin#mysql
   * @property {Boolean} enable - `true` by default
   * @see http://docs.sequelizejs.com/
   */
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  /**
   * validate  验证
   * @member {Function} Plugin#validate
   * @property {Boolean} enable - `true` by default
   */
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  /**
   * cors 跨域
   * @member {Function} Plugin#validate
   * @property {Boolean} enable - `true` by default
   */
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  /**
   * jwt token
   * @member {Function} Plugin#validate
   * @property {Boolean} enable - `true` by default
   */
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  /**
   * egg-socket.io
   * @member {Function} Plugin#validate
   * @property {Boolean} enable - `true` by default
   */
  io: {
    enable: true,
    package: 'egg-socket.io',
  },

  /**
   * egg-socket.io
   * @member {Function} Plugin#validate
   * @property {Boolean} enable - `true` by default
   */
  redis: {
    enable: true,
    package: 'egg-redis',
  },


};
