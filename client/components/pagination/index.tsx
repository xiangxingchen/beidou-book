import React from 'react';
import PaginationTypes from './PropsTypes';
import classnames from 'classnames';
import XyzIcon from '../xyzIcon';
import style from './index.module.less';

export default class Pagination extends React.Component<PaginationTypes, any> {
  public static defaultProps = {
    total: 1,
    pageSize: 10,
    current: 1,
  };
  public static getDerivedStateFromProps(nextProps, preState) {
    return {
      current: nextProps.current,
      totalPage: Math.ceil(nextProps.total / nextProps.pageSize),
    };
  }

  public constructor(props) {
    super(props);
    this.state = {
      current: props.current,
      totalPage: Math.ceil(props.total / props.pageSize),
    };
  }

  public render() {
    return (
      <div className={style.pagination}>
        <div
          className={classnames(style.pagination__item, {
          [style[`no-more`]]: Number(this.state.current) === 1,
        })}
          onClick={() => this.state.current > 1 && this.onChange(+this.state.current - 1)}
        >
          前一页
        </div>
        <div className={classnames(style[`pageSelect`], style[`pagination__item`])}>
          第{this.state.current}页
          <XyzIcon
            className={style.pagination__icon}
            kind="arrow-down"
            key="arrow-down"
          />
          <select className={style[`pageSelect__select`]} onChange={(ev) => this.onChange(ev.target.value)}>
            {
              Array(this.state.totalPage).fill(1).map((item, index) => (
                <option key={index} value={index + 1}>第{index + 1}页</option>
              ))
            }
          </select>
        </div>
        <div
          className={
            this.state.current === this.state.totalPage
            ? `${style[`pagination__item`]} ${style[`no-more`]}`
            : style[`pagination__item`]
          }
          onClick={() => this.state.current < this.state.totalPage && this.onChange(+this.state.current + 1)}
        >
          后一页
        </div>
      </div>
    );
  }
  private onChange = (value) => {
    window.scrollTo(0, 0);
    this.props.onChange(value);
  }
}
