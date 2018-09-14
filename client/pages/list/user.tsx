import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { defaultProps, computedProps } from 'react-decoration';
import _ from 'lodash';
import moment from 'moment';
import Header from '../../components/header';
import { userInit, onViewInit } from './redux/actions';
import { UserPropsType } from './redux/interface';
import classNames from 'classnames/bind';
import style from './index.module.less';
const cx = classNames.bind(style);
import { hot } from 'react-hot-loader';

interface State {
  modal: boolean;
}
@defaultProps({
  foo: 'bar',
})
@connect((state, props) => ({ user: state.user }), { onViewInit, userInit })
@computedProps({
  fullName: ({ foo, user }) => `${foo} ${user.name}`,
})
class User extends React.Component<UserPropsType, State> {
  protected aa = '123';
  constructor(props: UserPropsType) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  public componentDidMount() {
    this.props.onViewInit();
    const a: boolean = _.isArray('ddd');
    const b: string = moment(new Date()).format('YYYY-MM-DD');
  }

  public render() {
    return (
      <div>
        <Header title={'新一站保险网'} showMiniNavBtn={true} showSearchBtn={true} showCategoryBtn={true}/>
        <Button className={style.blue}>这是一个button</Button>
        <div>user f</div>
        <div>{this.aa}</div>
        <div>{this.state.modal}</div>
        <div className={cx('title_a')}>user-a</div>
      </div>
    );
  }
}

export default hot(module)(User);
