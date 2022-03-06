import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import './style.css';

const ButtonWrap = (props: ButtonInterface): ReactElement => {
  const { value, children } = props;
  return (
    <Button {...props} className="button-class">
      {children}
      {value}
    </Button>
  );
};

ButtonWrap.defaultProps = {
  value: 'Button',
};

interface ButtonInterface extends ButtonProps {
  value?: string;
}
export default ButtonWrap;
