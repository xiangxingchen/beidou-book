import React from 'react';
import { List, Button, Icon, NavBar, Result } from 'antd-mobile';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchBarOnTop from '../searchBarOnTop';
import Drawer from '../drawer';
import styles from './index.module.less';

const Item = List.Item;

interface Props {
  data?: any; // tslint:disable-line
  selectedItem?: SelectedItemObject [];
  visible?: boolean;
  onBackClick: () =>  void;
  onConfirm: (value: SelectedItemObject []) => void;
}

interface SelectedItemObject {
  name: string;
  optionId: number;
}

interface State {
  selectedCategoryIndex: number;
  selectedItem: SelectedItemObject [];
  selectedPanel: boolean;
  searchPanel: boolean;
  searchResultList: SelectedItemObject [];
}

class Destination extends React.Component<Props, State> {
  public static defaultProps = {
    visible: false,
    selectedItem: [],
  };

  protected maxLimitNumber = {
    number: 3,
    msg: '您选择的国家/地区过多，仅需选择主目的地或主签证国即可',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryIndex: 0,
      selectedItem: this.props.selectedItem,
      selectedPanel: false,
      searchPanel: false,
      searchResultList: [],
    };
  }

  // 搜索提交的事件
  public onSearchChange = (value) => {
    if (value.length > 0) {
      const result = [];
      this.props.data.forEach((element) => {
        if (typeof element.optionId !== 'undefined') {
          element.optionDTOs.forEach((item) => {// 该处的前置判断是为了过滤掉热门地区的重复目的地
            if (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              result.push({
                name: item.name,
                optionId: item.optionId,
              });
            }
          });
        }
      });
      this.setState({
        searchPanel: true,
        searchResultList: result,
      });
    } else {
      this.setState({
        searchPanel: false,
      });
    }
  }

  // 切换洲的事件
  public changeCategory = (index) => {
    this.setState({
      selectedCategoryIndex: index,
    });
  }

  // 获得当前地区项的选中状态，用于回显
  public getCheckedState = (optionId) => {
    let inArray = false;
    this.state.selectedItem.forEach((item) => {
      if (item.optionId === optionId) {
        inArray = true;
      }
    });
    return inArray;
  }

  // 选中反选地区项的事件
  public onSelect = (name, optionId) => {
    const newArray = this.state.selectedItem;
    let inArray = false;
    this.state.selectedItem.forEach((item) => {
      if (item.optionId === optionId) {
        inArray = true;
      }
    });
    if (!inArray) {
      if (newArray.length >= this.maxLimitNumber.number) {
        alert(this.maxLimitNumber.msg);
        return;
      }
      newArray.push({
        name,
        optionId,
      });
    } else {
      newArray.splice(newArray.findIndex(item => item.optionId === optionId), 1);
    }
    this.setState({
      selectedItem: newArray,
    });
  }

  // 切换到已选列表
  public switchToSelected = () => {
    this.setState({
      selectedPanel: true,
    });
  }

  // 关闭已选列表
  public onCloseSelected = () => {
    this.setState({
      selectedPanel: false,
    });
  }

  // 清空已选列表
  public onEmptySelected = () => {
    this.setState({
      selectedItem: [],
    });
  }

  // 确定事件
  public confirm = () => {
    this.props.onConfirm(this.state.selectedItem);
  }

  // 点击返回按钮事件
  public onClickBack = () => {
    if (this.state.searchPanel) {
      this.setState({
        searchPanel: false,
      });
    } else {
      this.props.onBackClick();
    }
  }

  // 渲染列表
  public renderList = (data) => {
    return (
      <Scrollbars>
        <List>
          {data.map((item) => (
            <Item
              extra={
                this.getCheckedState(item.optionId) ?
                  <Icon type={'check'} className={styles.destination__bd_list_item_icon}/> :
                  null
              }
              key={item.optionId}
              onClick={() => this.onSelect(item.name, item.optionId)}
            >
              {item.name}
            </Item>
          ))}
        </List>
      </Scrollbars>
    );
  }

  public render() {
    const original = (
      <div className={styles.destination}>
        <div className={styles.destination__hd}>
          <SearchBarOnTop placeholder="支持中英文搜索" onClickLeft={this.onClickBack} onChange={this.onSearchChange}/>
        </div>
        <div className={styles.destination__bd}>
          {!this.state.searchPanel ?
            <div className={styles.destination__bd_content}>
              <ul className={styles.destination__bd_nav}>
                {this.props.data.map((item, i) => (
                  <li
                    key={item.name}
                    className={classNames({
                      [styles.destination__bd_nav_item]: true,
                      [styles.destination__bd_nav_item_current] : i === this.state.selectedCategoryIndex,
                    })}
                    onClick={() => this.changeCategory(i)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <div className={styles.destination__bd_list}>
                {this.renderList(this.props.data[this.state.selectedCategoryIndex].optionDTOs)}
              </div>
            </div>
            :
            <div className={styles.destination__bd_content}>
              {this.state.searchResultList.length > 0 ?
                this.renderList(this.state.searchResultList)
                :
                <Result
                  title="没有搜到匹配的数据"
                  message="请重新输入关键词搜素"
                />
              }
            </div>
          }
        </div>
        <div className={styles.destination__ft}>
          <Button type="primary" inline className={styles.destination__ft_button} onClick={this.confirm}>确定</Button>
          <span className={styles.destination__ft_text}>
            已选择<em onClick={this.switchToSelected}>{this.state.selectedItem.length}</em>个目的地
          </span>
        </div>
      </div>
    );
    const selected = (
      <div className={styles.destination}>
        <div className={styles.destination__hd}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={this.onCloseSelected}
          >
            已选目的地
          </NavBar>
        </div>
        <div className={styles.destination__bd}>
          <div className={styles.destination__bd_list}>
            {this.state.selectedItem.length > 0 ?
              this.renderList(this.state.selectedItem)
            :
              <Result
                title="暂无已选目的地"
                message="请点击左上角的返回按钮选择目的地吧"
              />
            }
          </div>
        </div>
        <div className={styles.destination__ft}>
          <Button inline className={styles.destination__ft_button} onClick={this.onEmptySelected}>清空</Button>
        </div>
      </div>
    );
    return (
      <div>
        <Drawer
          position="right"
          sidebar={original}
          isWindow={true}
          open={this.props.visible}
        />
        <Drawer
          position="right"
          sidebar={selected}
          isWindow={true}
          open={this.state.selectedPanel}
        />
      </div>
    );
  }
}

export default Destination;
