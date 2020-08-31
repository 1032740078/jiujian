'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, NOW, TEXT } = app.Sequelize;
  /** 用户表 */
  const Users = app.model.define('users', {
    users_id: { type: INTEGER, unique: true, primaryKey: true, comment: '用户id' },
    // users_name: { type: STRING, unique: true, comment: '用户名' },
    // users_cname: { type: STRING, default: '无', comment: '真实姓名' },
    // users_addr: { type: STRING, default: '无', comment: '现居地' },
    // users_sex: { type: INTEGER, default: 0, comment: '性别,1男2女0无' },
    // users_avatar: { type: STRING, default: '', comment: '用户头像url地址' },
    // users_principal_card: { type: STRING, default: '', comment: '身份证号' },
    // users_national: { type: STRING, default: '', comment: '民族' },
    // users_password: { type: STRING, comment: '密码' },
    // users_phone_number: { type: STRING, comment: '手机号' },
    // users_he_Invite_code: { type: INTEGER, comment: '邀请码_他人(user_id)数据库只存user_id' },
    // users_commission_state: { type: INTEGER, comment: '佣金状态,第一次注册时为0,如果本人入职有佣金的工作成功则为1(冻结),入职周期到了则为2(未提现),并且邀请人领取了我的佣金,则为3(已提现)' },
    // // users_me_Invite_code: { type: INTEGER, comment: '邀请码_我的_唯一性(user_id)' },
    // users_apply_date: { type: DATE, defaultValue: NOW, comment: '注册时间' },
    // users_age: { type: DATE, comment: '用户出生日期' },
    // users_birthplace: { type: STRING, comment: '出生地or代理详细地址' },
    // users_education: { type: INTEGER, comment: '用户学历信息:0小学,1 初中,2 高中,3 大学,4 研究生,5 博士' },
    // users_role: { type: INTEGER, comment: '用户角色:0游客，1普通用户，2员工,3代理，4业务员,5企业,6总公司' },
    // users_open_id: { type: STRING, unique: true, comment: '用户的标识，对当前公众号唯一' },
    // users_union_id: { type: STRING, comment: '去中心化的网上身份认证' },
    // users_token: { type: STRING, comment: '用户 token' },
    // users_organization_id: { type: INTEGER, comment: '用户所属机构id' },
    // users_application_status: { type: INTEGER, default: 0, comment: '申请状态:1.申请中,2.成功,3.失败,4.失效' },
    // users_application_text: { type: TEXT, comment: '申请状态的备注' },
    // users_working_state: { type: INTEGER, default: 0, comment: '在位状态:1.在职2.调岗3.离职' },
    // users_working_start_date: { type: DATE, comment: '入职时间' },
    // users_individual_resume: { type: STRING, default: '无', comment: '个人简介' },
    // // 2.o
    // users_credit: { type: INTEGER, comment: '信用:0良好、1失约一次、2多次失约、3稳定性差、4打架斗殴、5偷抢拐骗' },
    // users_skill: { type: INTEGER, comment: '技能等级:0优良、1一般、2差劲' },
    // users_working_condition: { type: INTEGER, comment: '工作状态:0正在工作、1已申离职、2正在找工、3打算换工、4未想工作' },
    //
    //
    // users_proxy_area: { type: STRING, default: '', comment: '代理区域' },
    // users_proxy_start_time: { type: DATE, default: '', comment: '代理开始时间' },
    // users_proxy_end_time: { type: DATE, default: '', comment: '代理结束时间' },
    //
    // users_proxy_user_id: { type: INTEGER, comment: '本人的代理' },
    // users_salesman_user_id: { type: INTEGER, comment: '本人的业务员' },
    //
    // users_job_wanted_id: { type: INTEGER, comment: '求职id' },
  });
  //
  // /** 获取 username ,如果存在,则返回 对象,否则返回 null*/
  // Users.getUserName = async function(userName) {
  //   return await this.findOne({
  //     where: {
  //       users_name: userName,
  //     },
  //   });
  // };
  //
  //
  // /** 获取 openid ,如果存在,则返回 对象,否则返回 false*/
  // Users.getOpenId = async function(openid) {
  //   // 查询用户是否存在
  //   return await this.findOne({
  //     where: {
  //       users_open_id: openid,
  //     },
  //   });
  // };
  //
  // /** 根据 userName 获取角色,不存在否则返回 false*/
  // Users.getUserRole = async function(userName) {
  //   // 查询用户是否存在
  //   const user = await this.findOne({
  //     where: {
  //       users_name: userName,
  //     },
  //   });
  //
  //   return user ? user.users_role : false;
  // };
  //
  //
  // /** 先对比 token,然后根据 userid 获取角色,不存在否则返回 false*/
  // Users.upToken = async function(userName, token) {
  //   // 查询用户是否存在
  //   const user = await this.findOne({
  //     where: {
  //       users_name: userName,
  //     },
  //   });
  //   if (user) {
  //     await user.update({
  //       users_token: token,
  //     });
  //     return user;
  //   }
  //   return false;
  // };

  /** *** user *******/
  return Users;
};
