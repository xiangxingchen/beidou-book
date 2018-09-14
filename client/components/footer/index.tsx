import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import XyzIcon from '../xyzIcon';
import styles from './index.module.less';

class Footer extends React.Component {
  protected server = [ '7X24小时客服', '保监会授权', '专业理赔服务' ];
  protected opts = [
    {
      name: '登录',
      link: '/session/login?mainFlag=1',
      isLogin: false,
    },
    {
      name: '注册',
      link: '/register/new?falg=1',
      isLogin: false,
    },
    // {
    //   name: '用户名',
    //   isLogin: true,
    // },
    // {
    //   name: '退出',
    //   link: '/',
    //   isLogin: true,
    // },
    {
      name: '电脑版',
      link: 'https://www.xyz.cn/?site_preference=normal',
    },
    {
      name: '下载App',
      link: '/special/app.html',
    },
  ];
  protected links = [
    {
      name: '关于我们',
      link: '/aboutus/aboutus.html',
    },
    {
      name: '用户协议',
      link: '/aboutus/terms.html',
    },
    {
      name: '站点地图',
      link: '/aboutus/sitemap.html',
    },
    {
      name: '联系我们',
      link: '/contact/new',
    },
  ];
  public renderOpts = () => {
    return (
      <div className={styles.opts}>
        {
          this.opts.map((item, i) => {
            return (
              <Link
                className={classNames({
                  [styles.opts__item]: true,
                  'link-light': true,
                })}
                to={item.link}
                key={`opts_${i}`}
              >
                {item.name}
              </Link>
            );
          })
        }
      </div>
    );
  }
  public renderServer = () => {
    return (
      <ul className={styles.server}>
        {this.server.map((item, i) => {
          return (
            <li
              className={styles.server__item}
              key={`server_${i}`}
            >
              <XyzIcon kind="check-o"/>
              &nbsp;{item}
            </li>
          );
        })}
      </ul>
    );
  }
  public renderLinks = () => {
    return (
      <div className={styles.links}>
        {this.links.map((item, i) => {
          return (
            <Link
              className={classNames({
                [styles.links__item]: true,
                'link-light': true,
              })}
              to={item.link}
              key={`link_${i}`}
            >
              {item.name}
            </Link>);
        })}
      </div>
    );
  }
  public render() {
    return (
      <div className={styles.footer}>
        {this.renderServer()}
        {this.renderOpts()}
        {this.renderLinks()}
        <div className={styles.copyright}>©&nbsp;{moment().format('YYYY')}&nbsp;新一站保险代理股份有限公司</div>
        <div className={styles.reference}>苏ICP备11025489号</div>
      </div>
    );
  }
}

export default Footer;
