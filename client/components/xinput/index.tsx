import React from 'react';
import classnames from 'classnames';
import XInputPropsTypes from './PropsTypes';
import XyzIcon from '../xyzIcon';
import style from './index.module.less';

export default class XInput extends React.Component<XInputPropsTypes, any> {
  public static defaultProps = {
    header: null,
    children: null,
    isDefaultChecked: false,
    type: 'checkbox',
  };
  public static set(key: string, value: string | number | (string | number)[]) {
    XInput.inputValue[key] = value;
    XInput.inputChangeSubscribeQueue[key].map(item => item(value));
  }
  private static inputValue = {};
  private static inputChangeSubscribeQueue = {};
  public constructor(props) {
    super(props);
    const isRadio = props.type === 'radio';

    this.state = {
      active: false,
      propsChecked: props.isDefaultChecked,
      checked: props.isDefaultChecked,
    };

    XInput.inputValue[props.name] = XInput.inputValue[props.name] || {};
    if (props.isDefaultChecked && !isRadio) {
      XInput.inputValue[props.name][props.value] = true;
    } else if (props.isDefaultChecked && isRadio) {
      XInput.inputValue[props.name] = props.value;
    }

    XInput.inputChangeSubscribeQueue[props.name] = XInput.inputChangeSubscribeQueue[props.name] || [];
    XInput.inputChangeSubscribeQueue[props.name].push(values => this.setState({
      checked: values.toString().indexOf(props.value) !== -1,
    }));
  }

  public render() {
    const { children, header, type } = this.props;
    const wrapCls = classnames(style['x-input'], {
      [style[`x-input__checkbox`]]: type === 'checkbox',
      [style[`radio`]]: type === 'radio',
      [style[`checked`]]: this.state.checked,
      [style[`active`]]: type === 'checkbox' && this.state.active,
    });

    const radioHTML = (
      <XyzIcon
        kind="check-o"
        className={style[`radio__icon`]}
      />
    );
    const checkboxHTML = (
      <XyzIcon
        kind="arrow-down"
        className={style[`header__icon`]}
        onClick={this.switchDescriptionState}
      />
    );
    return (
      <div className={wrapCls}>
        <div
          className={style[`header`]}
          onClick={() => type === 'radio' && this.onInputClick()}
        >
          <div className={style[`header__label`]} onClick={this.onInputClick}>
            {type === 'checkbox' && <input type="checkbox"/>}
            <label>{header}</label>
          </div>
          {type === 'radio' ? radioHTML : checkboxHTML}
        </div>
        {children && <div className={style[`x-input__description`]}>{children}</div>}
      </div>
    );
  }

  private onInputClick = () => {
    const isRadio = this.props.type === 'radio';
    this.setState({
      checked: !this.state.checked,
    });

    if (isRadio && !this.state.checked) {
      XInput.set(this.props.name as string, this.props.value);
    } else if (isRadio && this.state.checked) {
      delete XInput.inputValue[this.props.name];
    } else if (!isRadio && !this.state.checked) {
      XInput.inputValue[this.props.name][this.props.value] = true;
    } else if (!isRadio && this.state.checked) {
      delete XInput.inputValue[this.props.name][this.props.value];
    }

    if (isRadio) {
      this.props.onChange(XInput.inputValue[this.props.name]);
    } else if (!isRadio) {
      this.props.onChange(Object.keys(XInput.inputValue[this.props.name]));
    }
  }
  private switchDescriptionState = () => {
    this.setState({
      active: !this.state.active,
    });
  }
}
