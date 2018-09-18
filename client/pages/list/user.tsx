import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import { defaultProps, computedProps } from 'react-decoration';
import { inject, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';

import { UserPropsType } from './redux/interface';
import style from './index.module.less';

const cx = classNames.bind(style);

interface State {
  modal: boolean;
}
@inject('userStore')
@observer
@defaultProps({ foo: 'bar' })
class User extends React.Component<UserPropsType, State> {
  protected aa = '123';
  constructor(props: UserPropsType) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  public componentDidMount() {
    const a: boolean = _.isArray('ddd');
    const b: string = moment(new Date()).format('YYYY-MM-DD');
  }
  public onClick = (): void => {
    // this.props.userStore.currentUser = 'dddd';
    this.props.userStore.getData();
  }

  public render() {
    const { data, currentUser } = this.props.userStore;
    return (
      <div>
        <Button className={style.blue} onClick={this.onClick}>这是一个button</Button>
        <div>user{currentUser}</div>
        {data.length > 0 && data.map(item => <div key={item}>{item}</div>)}
        <div>{this.aa}</div>
        <div>{this.state.modal}</div>
        <div className={cx('title_a')}>user-a</div>
      </div>
    );
  }
}

export default hot(module)(User);
