import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row } from 'antd';
import React, { ReactElement } from 'react';
import './style.less';

interface AddOnCounterFieldProps {
  title: string;
  value: number;
  onIncrement: React.MouseEventHandler<HTMLSpanElement>;
  onDecremenet: React.MouseEventHandler<HTMLSpanElement>;
  disabled?: any;
}

const AddOnCounterField = ({
  title,
  value,
  onIncrement,
  onDecremenet,
  disabled,
}: AddOnCounterFieldProps): ReactElement => {
  return (
    <Row gutter={[0, 0]} className="addon-counter-field-container">
      <Col xs={7} lg={7}>
        <div className="left-sec">{title}</div>
      </Col>
      <Col xs={10} lg={10}>
        <div className="mid-sec">{value}</div>
      </Col>
      <Col xs={7} lg={7}>
        <div className="right-sec">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined className="icon" onClick={onIncrement} />}
            disabled={disabled}
          />
          {/* <PlusOutlined className="icon" onClick={onIncrement} /> */}
          <Divider type="vertical" className="divider" />
          {/* <MinusOutlined className="icon" onClick={onDecremenet} /> */}
          <Button
            type="primary"
            shape="circle"
            icon={<MinusOutlined className="icon" onClick={onDecremenet} />}
            // disabled={disabled}
          />
        </div>
      </Col>
    </Row>
  );
};

AddOnCounterField.defaultProps = {
  disabled: false,
};

export default AddOnCounterField;
