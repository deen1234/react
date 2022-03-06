import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import './styles.less';

interface DialogBoxProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: any;
  footer: React.ReactNode;
}

const DialogBox = ({
  children,
  visible,
  setVisible,
  footer,
}: DialogBoxProps): React.ReactElement => {
  return (
    <Modal
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      centered
      className="modal-container"
      footer={footer}
      closeIcon={<CloseCircleOutlined />}
    >
      {children}
    </Modal>
  );
};

export default DialogBox;
