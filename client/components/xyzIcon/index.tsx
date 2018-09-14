import React from 'react';
import classNames from 'classnames/bind';

interface Props {
  kind: string;
  className?: string;
  colorFul?: boolean;
  onClick?: () => void;
}

class XyzIcon extends React.Component<Props> {
  public static defaultProps = {
    colorFul: false,
  };

  public renderSvg = () => {
    return(
      <svg
        className={classNames({
          icon: true,
          [this.props.className]: true,
        })}
        aria-hidden="true"
      >
        <use xlinkHref={`#icon-${this.props.kind}`}/>
      </svg>
    );
  }

  public renderFontIcon = () => {
    return (
      <i
        className={classNames({
          iconfont: true,
          [this.props.className]: true,
          ['icon-' + this.props.kind]: true,
        })}
        onClick={this.props.onClick}
      />);
  }

  public render() {
      if (this.props.colorFul) {
        return this.renderSvg();
      } else {
        return this.renderFontIcon();
      }
  }
}

export default XyzIcon;
