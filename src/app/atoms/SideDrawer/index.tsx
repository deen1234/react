import { Drawer } from 'antd';
import React from 'react';
import './styles.less';

interface SideDrawerProps {
  title?: string;
  children: React.ReactNode;
  visible: boolean;
  setVisible: any;
}

const SideDrawer = ({
  title,
  children,
  visible,
  setVisible,
}: SideDrawerProps): React.ReactElement => {
  return (
    <Drawer
      title={title}
      placement="left"
      onClose={() => setVisible(false)}
      visible={visible}
      className="filter-drawer"
    >
      {children}
    </Drawer>
  );
};

SideDrawer.defaultProps = {
  title: '',
};

export default SideDrawer;
