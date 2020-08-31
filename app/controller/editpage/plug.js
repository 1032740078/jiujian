'use strict';

const Controller = require('egg').Controller;

/** 接口的请求参数规则
 *  如果参数校验未通过，将会抛出一个 status = 422 的异常
 * */
const apiRule = {
    create: {},
    inquire: {},
    update: {},
    delete: {},
};


class TopicController extends Controller {


    /**
     * @catalog 编辑页-模块
     * @description 新建
     * @remark 这里是备注信息
     */
    async create() {
        const {ctx} = this;
        ctx.validate(apiRule.create, ctx.request.body);// 校验接口参数是否符合我们预期的格式
        const res = await ctx.service.editpage.plug.create(ctx.request.body);
        // 设置响应体和状态码
        ctx.body = {res: res.contents, message: res.message,};
        ctx.status = res.status;
    }

    /**
     * @catalog 编辑页-模块
     * @description 查询
     * @remark 这里是备注信息
     */
    async inquire() {
        const {ctx} = this;
        ctx.validate(apiRule.inquire, ctx.request.body);// 校验接口参数是否符合我们预期的格式
        const res = await ctx.service.editpage.plug.inquire(ctx.request.body);
        // 设置响应体和状态码
        ctx.body = {res: res.contents, message: res.message,};
        ctx.status = res.status;
    }

    /**
     * @catalog 编辑页-模块
     * @description 更新
     * @remark 这里是备注信息
     */
    async update() {
        const {ctx} = this;
        ctx.validate(apiRule.update, ctx.request.body);// 校验接口参数是否符合我们预期的格式
        const res = await ctx.service.editpage.plug.update(ctx.request.body);
        // 设置响应体和状态码
        ctx.body = {res: res.contents, message: res.message,};
        ctx.status = res.status;
    }

    /**
     * @catalog 编辑页-模块
     * @description 删除
     * @remark 这里是备注信息
     */
    async delete() {
        const {ctx} = this;
        ctx.validate(apiRule.delete, ctx.request.body);// 校验接口参数是否符合我们预期的格式
        const res = await ctx.service.editpage.plug.delete(ctx.request.body);
        // 设置响应体和状态码
        ctx.body = {res: res.contents, message: res.message,};
        ctx.status = res.status;
    }

}

module.exports = TopicController;
