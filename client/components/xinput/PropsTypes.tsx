import React from 'react';

export default interface XInputPropsTypes {
  prefixCls?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  isDefaultChecked?: boolean;
  type?: 'checkbox' | 'radio';
  name: string | number;
  value: string | number;
  onChange: (any) => void;
}
