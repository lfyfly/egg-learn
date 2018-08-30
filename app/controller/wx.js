'use strict';
const axios = require('axios');
const Controller = require('egg').Controller;
const wxConfig = {
  appid: 'wxf6b5f5ac3a8223b3',
  appsecret: '178cb986642676d858eedf8869dd50b7',
  redirectUrl: 'http://666story.com/wx_redirect',
  scope: 'snsapi_userinfo',
};
class NewsController extends Controller {
  async login() {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appid}&redirect_uri=${wxConfig.redirectUrl}&response_type=code&scope=${wxConfig.scope}&state=STATE#wechat_redirect`;
    await this.ctx.redirect(url);
  }
  async redirect() {
    // 获取code
    const code = this.ctx.query.code;

    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appid}&secret=${wxConfig.appsecret}&code=${code}&grant_type=authorization_code`;
    console.log('url:', url);
    const { data } = await axios.get(url);
    // data: 获得到 access_token openid
    //  {
    //    "access_token":"13_pGZd_c7stWYPVYp9lV66IRf20ny5A_g8kuEWiES6ExICyCy0rWN_eBr87zQMIjH38E81o9UK0wI8SWztrsm54WFE33n2XWEdze5GDMhTay0",
    //    "expires_in":7200,
    //    "refresh_token":"13_TmvOxZ212nSjVLceFYZRspD0NYuhvnxc0FK_p-auzWss135qowJOZfPEhKdqlTmqCUurUB7zFCoWcKcey2P-iWwVFYTYfumc5ALDia9RGWc",
    //    "openid":"o6Kvs0TW5bO7Him6_h6zpD79r0cs",
    //    "scope":"snsapi_userinfo"
    //   }
    // 存在wx用户表里
    // 生成session，服务端session里存着openid，返回给客户端，客户端再通过session请求用户信息
    this.ctx.body = data;
  }
  async wx_userinfo() {
    // 1. 获取tocken
    //  const tocken = 'tocken'
    // 2. 由tocken -> openid -> access_token
    // const tocken = 'openId'

    // const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${}&openid=OPENID&lang=zh_CN`
  }
}

module.exports = NewsController;
