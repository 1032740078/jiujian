'use strict';

const Service = require('egg').Service;
const Base64 = require('js-base64').Base64;
const rp = require('request-promise');

class TopicService extends Service {
  /** 登陆 */
  async new(params) {
    console.log(params);

    // 返回创建的 topic 的 id
    return 200;
  }

  /** 普通注册 */
  async create(data) {
    console.log(data);
    const user = await this.app.model.Users.getUserName(data.username);
    if (user) {
      return false;
    }
    const transaction = await this.app.model.transaction();
    try {
      const id = await this.app.model.Onlyid.getNewId(1, transaction);
      let users_application_status = '';
      if (data.users_application_status) {
        users_application_status = data.users_application_status;
      } else {
        users_application_status = data.usertype !== 6 && data.usertype !== 0 ? 1 : 0;

      }
      // 新建 user
      await this.app.model.Users.create({
        users_id: id,
        users_name: data.username,
        users_password: data.password,
        users_role: data.usertype, // 用户类型
        users_application_status, // 申请中(总公司和游客默认为0)
        users_working_state: 1, // 在职
      }, { transaction });
      const walletId = await this.app.model.Onlyid.getNewId(1, transaction);
      // 新建 用户钱包
      await this.app.model.Wallet.create({
        wallet_id: walletId,
        wallet_users_id: id,
        wallet_active_money: 0, // 可用金额,单位:分
        wallet_freeze_money: 0, // 非可用金额,单位:分
      }, { transaction });
      // 提交事务
      await transaction.commit();
      return id;
    } catch (e) {
      // 事务失败,回滚
      await transaction.rollback();
      return false;
    }
  }


  /** openid 登陆 */
  async show(UserInfo, invitation) {
    // 7天后过期的 token
    const token = this.app.jwt.sign({ openid: UserInfo.openid }, this.app.config.jwt.secret, { expiresIn: 7 * 24 * 60 * 60 });
    const user = await this.app.model.Users.getOpenId(UserInfo.openid);
    const transaction = await this.app.model.transaction();
    const wx_access = await this.app.model.Wxaccesstoken.findAll();

    /** 已有账号*/
    if (user) {
      try {
        // 更新头像
        const rpbody = await rp({
          method: 'GET',
          uri: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + wx_access[0].wx_access_token + '&openid=' + UserInfo.openid,
        });

        await user.update({
          users_token: token,
          users_avatar: JSON.parse(rpbody).headimgurl ? JSON.parse(rpbody).headimgurl : '',
        }, { transaction });


        // 提交事务
        await transaction.commit();
        return { token, users_id: user.users_id };
      } catch (e) {
        // 事务失败,回滚
        await transaction.rollback();
        return false;
      }

    }
    /** 第一次注册 */
    try {
      console.log('UserInfo=>>', UserInfo);
      // console.log(Base64.encode(JSON.stringify({ users_id: 27, users_name: 'robin_dl001' })));
      console.error(invitation)
      // console.error(Base64.decode(invitation))
      console.error(decodeURIComponent(invitation))
      const invitationUserId = (invitation !== 'undefined' ? invitation : false) && JSON.parse(decodeURIComponent(invitation)).users_id;

      const id = await this.app.model.Onlyid.getNewId(1, transaction);
      const user_data = {
        users_id: id,
        users_token: token,
        users_open_id: UserInfo.openid,
        users_role: 0, // 游客
        users_he_Invite_code: invitationUserId || 1, // 邀请码_他人(user_id)
        users_commission_state: 0, // 佣金状态
      };

      const rpbody = await rp({
        method: 'GET',
        uri: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + wx_access[0].wx_access_token + '&openid=' + UserInfo.openid,
      });
      user_data.users_avatar = JSON.parse(rpbody).headimgurl ? JSON.parse(rpbody).headimgurl : '';


      if (invitationUserId) {
        // 查询邀请人的信息
        const invitationUser = await this.app.model.Users.findOne({
          where: {
            users_id: invitationUserId,
          },
        });
        // 如果邀请人是代理
        if (invitationUser.users_role === 3) {
          user_data.users_proxy_user_id = invitationUserId;
        } else if (invitationUser.users_role !== 4 && invitationUser.users_role !== 5 && invitationUser.users_role !== 6) {
          // 如果邀请人的代理id不为空
          if (invitationUser.users_proxy_user_id) {
            user_data.users_proxy_user_id = invitationUser.users_proxy_user_id;
          }
        }

      }
      console.log('user_data=>', user_data);
      // 新建 openid
      await this.app.model.Users.create({
        ...user_data,
      }, { transaction });
      const walletId = await this.app.model.Onlyid.getNewId(1, transaction);
      // 新建 用户钱包
      await this.app.model.Wallet.create({
        wallet_id: walletId,
        wallet_users_id: id,
        wallet_active_money: 0, // 可用金额,单位:分
        wallet_freeze_money: 0, // 非可用金额,单位:分
      }, { transaction });
      // 提交事务
      await transaction.commit();
      return { token, users_id: id };
      // });

    } catch (e) {
      // 事务失败,回滚
      console.log(e);
      await transaction.rollback();
      return false;
    }
  }


}

module.exports = TopicService;
