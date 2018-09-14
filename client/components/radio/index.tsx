import React from 'react';
import style from './index.module.less';

export default class Radio extends React.Component<any, any> {
  public render() {
    const { text, className, ...restProps } = this.props;
    return (
      <input type="radio" {...restProps} className={`${style['x-radio']} ${className}`} data-text={text}/>
    );
  }
}
