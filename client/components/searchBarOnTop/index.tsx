import React from 'react';
import { NavBar, SearchBar } from 'antd-mobile';
import styles from './index.module.less';
import XyzIcon from '../xyzIcon';

interface Props {
  placeholder?: string;
  onClickLeft: () => void;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
}

class SearchBarOnTop extends React.Component<Props> {
  public static defaultProps = {
    placeholder: 'Search',
  };

  public render() {
    return (
      <NavBar
        mode="light"
        icon={<XyzIcon kind="arrow-left" className={styles.search__back}/>}
        onLeftClick={this.props.onClickLeft}
      >
        <SearchBar
          placeholder={this.props.placeholder}
          className={styles.search}
          onSubmit={this.props.onSubmit && ((value) => this.props.onSubmit(value))}
          onChange={this.props.onChange && ((value) => this.props.onChange(value))}
        />
      </NavBar>
    );
  }
}

export default SearchBarOnTop;
