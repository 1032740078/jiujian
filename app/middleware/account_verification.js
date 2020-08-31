'use strict';

/** 验证用户角色是否有权限访问路由 */
module.exports = options => {
    return async function accountVerification(ctx, next) {
        // if (!ctx.req.headers.userid) {
        //     ctx.body = {
        //         body: '',
        //         message: '头部参数错误',
        //     };
        //     ctx.status = 422;
        // }


    };
};
