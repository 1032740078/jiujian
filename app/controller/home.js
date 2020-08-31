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
   * @remark 这里是备注信息
   */
  async index() {
    const { ctx } = this;
    ctx.validate(apiRule.POST, ctx.request.body);// 校验接口参数是否符合我们预期的格式
    const res = await ctx.service.home.index(ctx.request.body);
    // 设置响应体和状态码

    if (res) {
      ctx.body = {
        res,
        message: 'ok',
      };
      ctx.status = 200;
    } else {
      ctx.body = {
        res: '',
        message: 'no ok',
      };
      ctx.status = 400;
    }
  }


}

module.exports = TopicController;
