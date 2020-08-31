'use strict';

const Controller = require('egg').Controller;

/** 接口的请求参数规则
 *  如果参数校验未通过，将会抛出一个 status = 422 的异常
 * */
const apiRule = {
  /** GET */
  GET: {},


  /** POST */
  POST: {
    username: 'string', // 用户名
    password: 'string', // 密码
  },


  /** PUT */
  PUT: {},


  /** DELETE */
  DELETE: {},
};


class TopicController extends Controller {


  /**
   * showdoc
   * @catalog 用户相关
   * @title 普通登陆
   * @description 普通登陆
   * @method POST
   * @url /byteGem/api/v2/users/login/
   * @param username 必填 string 用户名
   * @param password 必填 string 密码
   * @return {"res":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYmluX3pncyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTY2NTU2NDIxLCJleHAiOjE1NjcxNjEyMjF9.aiJCDsx3KaFr840XuMbe9nF0Dg_IhISxaTMGZQs2ogc","role":6,"userId":2},"message":"登陆成功"}
   * @return_param token string token
   * @return_param message string 接口信息
   * @remark 这里是备注信息
   * @number 1
   */
  async create() {
    const { ctx } = this;
    ctx.validate(apiRule.POST, ctx.request.body);// 校验接口参数是否符合我们预期的格式
    const res = await ctx.service.users.create(ctx.request.body);
    // 设置响应体和状态码

    if (res) {
      ctx.body = {
        res,
        message: '登陆成功',
      };
      ctx.status = 200;
    } else {
      ctx.body = {
        res: '',
        message: '登陆失败',
      };
      ctx.status = 400;
    }
  }


}

module.exports = TopicController;
