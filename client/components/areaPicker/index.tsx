import React from 'react';
import { List, Radio } from 'antd-mobile';
import classNames from 'classnames/bind';
import styles from './index.module.less';
import Drawer from '../drawer';
import XyzIcon from '../xyzIcon';
import request from '../../utils/request';

const RadioItem = Radio.RadioItem;

interface Props {
  dataUrl?: string;
  params?: string [];
}

interface AreaItem {
  name: string;
  code: number;
}

interface State {
  locationStatus: number;
  tabIndex: number;
  select: AreaItem [];
  data: any;
}

class AreaPicker extends React.Component<Props, State> {
  public static defaultProps = {
    dataUrl: '/membercenter/orders/ajaxGetArea',
    params: [ 'code', 'globalDefineId' ],
  };

  protected locationStatusList = {
    0: '正在定位...',
    1: '定位成功',
    2: '定位失败',
  };

  protected placeholder = {
    0: '请选择省',
    1: '请选择市',
    2: '请选择区',
  };

  constructor(props) {
    super(props);
    this.state = {
      locationStatus: 0,
      tabIndex: 1,
      select: [
        {
          name: '江苏',
          code: 210000,
        },
        {
          name: '南京',
          code: 210010,
        },
      ],
      data: [
        {
          name: '江苏',
          code: 210000,
          children: [
            {
              name: '南京',
              code: 210010,
              children: [
                {
                  name: '浦口区',
                  code: 210011,
                },
                {
                  name: '鼓楼区',
                  code: 210012,
                },
                {
                  name: '雨花台区',
                  code: 210013,
                },
                {
                  name: '江宁区',
                  code: 210014,
                },
                {
                  name: '六合区',
                  code: 210015,
                },
                {
                  name: '仙林区',
                  code: 210016,
                },
              ],
            },
            {
              name: '苏州',
              code: 210002,
            },
          ],
        },
        {
          name: '湖北',
          code: 430000,
          children: [
            {
              name: '武汉',
              code: 432000,
              children: [
                {
                  name: '武昌区',
                  code: 432001,
                },
                {
                  name: '汉阳区',
                  code: 432002,
                },
                {
                  name: '硚口区',
                  code: 432003,
                },
              ],
            },
          ],
        },
      ],
    };
  }
  // 渲染tab
  public renderTab = () => {
    return (
      <ul className={styles.area_picker__tab}>
        {
          this.state.select.map((item, i) => {
            return this.renderTabItem(item.code, item.name, i);
          })
        }
        {
          this.state.select.length < 3 ?
            this.renderTabItem(-1, this.placeholder[this.state.select.length], this.state.select.length)
            : null
        }
      </ul>
    );
  }
  // 渲染tab项
  public renderTabItem = (code = 0, name = '', index = 0) => {
    return (
      <li
        key={code}
        className={classNames({
          [styles.area_picker__tab_item]: true,
          [styles.active]: index === this.state.tabIndex,
        })}
        onClick={() => this.changeTab(index)}
      >
        {name}
      </li>
    );
  }
  // 点击tab事件
  public changeTab = (index) => {
    this.setState({ tabIndex: index });
  }
  // 渲染待选择列表
  public renderList = () => {
    // 获取当前数据的兄弟数据合集
    const listData = this.getTreeBrothers(this.state.data, this.state.select[this.state.tabIndex].code);
    console.log(111111111111111);
    console.log(this.state.select);
    console.log(listData);
    return (
      listData.map(item => {
        return (
          <RadioItem
            key={item.code}
            checked={this.state.select[this.state.tabIndex].code === item.code}
            onClick={() => this.onSelect(item)}
          >
            {item.name}
          </RadioItem>);
      })
    );
  }
  // 获取树的兄弟级
  public getTreeBrothers = (tree, code) => {
    let result = null;
    const query = (tree, code) => {
      for (const item of tree) {
        if (code === item.code) {
          result = tree;
          return;
        } else if (item.children && item.children.length > 0) {
          query(item.children, code);
        }
      }
    };
    query(tree, code);
    return result;
  }
  // 列表选中事件
  public onSelect = (item) => {
    const newSelectedArray = this.state.select;
    newSelectedArray[this.state.tabIndex] = {
      name: item.name,
      code: item.code,
    };
    this.setState({
      select: newSelectedArray,
    });
    if (this.state.tabIndex < 2) {
      this.setState({
        tabIndex: this.state.tabIndex + 1,
      });
    } else {
      alert('DONE');
    }
  }
  public render() {
    const content = (
      <div className={styles.area_picker}>
        <div className={styles.area_picker__hd}>
          <div className={styles.area_picker__title}>居住地</div>
          <div className={styles.area_picker__cancel}>取消</div>
        </div>
        <div className={styles.area_picker__bd}>
          <div className={styles.area_picker__location}>
            <span><XyzIcon kind="loaction"/></span>
            <span>{this.locationStatusList[this.state.locationStatus]}</span>
            <span>江苏省南京市浦口区</span>
            <span>刷新</span>
            <span>GPS定位</span>
          </div>
          <div className={styles.area_picker__choose}>
            {this.renderTab()}
            <div className={styles.area_picker__content}>
              {this.renderList()}
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <Drawer
        sidebar={content}
        position={'bottom'}
        showMask={true}
        open={false}
        isWindow={true}
      />
    );
  }
}

export default AreaPicker;
