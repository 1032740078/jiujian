'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

    /** ****************************** 通用 ***********************************/
    app.router.get('/', app.controller.home.index);

    /*用户*/
    app.router.get('/api/v1/users/login', app.controller.users.login);// 登录
    app.router.post('/api/v1/users/create', app.controller.users.create);// 新建
    app.router.get('/api/v1/users/inquire', app.controller.users.inquire);// 查询
    app.router.post('/api/v1/users/update', app.controller.users.update);// 更新
    app.router.get('/api/v1/users/delete', app.controller.users.delete);// 删除

    /*编辑页-模块*/
    app.router.post('/api/v1/edit/page/module/create', app.controller.editpage.module.create);// 新建
    app.router.get('/api/v1/edit/page/module/inquire', app.controller.editpage.module.inquire);// 查询
    app.router.post('/api/v1/edit/page/module/update', app.controller.editpage.module.update);// 更新
    app.router.get('/api/v1/edit/page/module/delete', app.controller.editpage.module.delete);// 删除

    /*编辑页-页面*/
    app.router.post('/api/v1/edit/page/pages/create', app.controller.editpage.pages.create);// 新建
    app.router.get('/api/v1/edit/page/pages/inquire', app.controller.editpage.pages.inquire);// 查询
    app.router.post('/api/v1/edit/page/pages/update', app.controller.editpage.pages.update);// 更新
    app.router.get('/api/v1/edit/page/pages/delete', app.controller.editpage.pages.delete);// 删除

    /*编辑页-素材*/
    app.router.post('/api/v1/edit/page/material/create', app.controller.editpage.material.create);// 新建
    app.router.get('/api/v1/edit/page/material/inquire', app.controller.editpage.material.inquire);// 查询
    app.router.post('/api/v1/edit/page/material/update', app.controller.editpage.material.update);// 更新
    app.router.get('/api/v1/edit/page/material/delete', app.controller.editpage.material.delete);// 删除

    /*编辑页-开发*/
    app.router.post('/api/v1/edit/page/development/create', app.controller.editpage.development.create);// 新建
    app.router.get('/api/v1/edit/page/development/inquire', app.controller.editpage.development.inquire);// 查询
    app.router.post('/api/v1/edit/page/development/update', app.controller.editpage.development.update);// 更新
    app.router.get('/api/v1/edit/page/development/delete', app.controller.editpage.development.delete);// 删除

    /*编辑页-插件*/
    app.router.post('/api/v1/edit/page/plug/create', app.controller.editpage.plug.create);// 新建
    app.router.get('/api/v1/edit/page/plug/inquire', app.controller.editpage.plug.inquire);// 查询
    app.router.post('/api/v1/edit/page/plug/update', app.controller.editpage.plug.update);// 更新
    app.router.get('/api/v1/edit/page/plug/delete', app.controller.editpage.plug.delete);// 删除

    /*编辑页-团队*/
    app.router.post('/api/v1/edit/page/team/create', app.controller.editpage.team.create);// 新建
    app.router.get('/api/v1/edit/page/team/inquire', app.controller.editpage.team.inquire);// 查询
    app.router.post('/api/v1/edit/page/team/update', app.controller.editpage.team.update);// 更新
    app.router.get('/api/v1/edit/page/team/delete', app.controller.editpage.team.delete);// 删除

    /*编辑页-配置*/
    app.router.post('/api/v1/edit/page/configuration/create', app.controller.editpage.configuration.create);// 新建
    app.router.get('/api/v1/edit/page/configuration/inquire', app.controller.editpage.configuration.inquire);// 查询
    app.router.post('/api/v1/edit/page/configuration/update', app.controller.editpage.configuration.update);// 更新
    app.router.get('/api/v1/edit/page/configuration/delete', app.controller.editpage.configuration.delete);// 删除

    /*编辑页-页面内容*/
    app.router.post('/api/v1/edit/page/content/create', app.controller.editpage.content.create);// 新建
    app.router.get('/api/v1/edit/page/content/inquire', app.controller.editpage.content.inquire);// 查询
    app.router.post('/api/v1/edit/page/content/update', app.controller.editpage.content.update);// 更新
    app.router.get('/api/v1/edit/page/content/delete', app.controller.editpage.content.delete);// 删除
};
