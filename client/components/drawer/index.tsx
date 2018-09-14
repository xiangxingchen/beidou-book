import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.less';

interface Props {
  position?: 'right' | 'bottom' | 'left' | 'top';
  sidebar: React.ReactNode;
  open?: boolean;
  className?: string;
  showMask?: boolean;
  zIndex?: number;
  clickMask?: () => void;
  isWindow?: boolean;
}

class Drawer extends React.Component<Props> {
  public static defaultProps = {
    position: 'right',
    open: false,
    showMask: false,
    zIndex: 999,
    isWindow: false,
  };

  public clickMask = () => {
    if (this.props.clickMask) {
      this.props.clickMask();
    }
  }

  public render() {
    return (
      <div
        className={classNames({
          [styles.drawer__wrap]: true,
          [styles.window]: this.props.isWindow,
        })}
        style={{ zIndex: this.props.zIndex }}
      >
        {this.props.showMask ?
          <div
            className={classNames({
              [styles.drawer__mask]: true,
              [styles.open]: this.props.open,
            })}
            onClick={this.clickMask}
            style={{ zIndex: this.props.zIndex }}
          /> : null
        }
        <div
          className={classNames({
            [styles.drawer]: true,
            [styles[this.props.position]]: true,
            [styles.open]: this.props.open,
            [this.props.className]: true,
            [styles.window]: this.props.isWindow,
          })}
          style={{ zIndex: this.props.zIndex }}
        >
          {this.props.sidebar}
        </div>
      </div>);
  }
}

export default Drawer;
