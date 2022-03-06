import React, { ReactElement, useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { forgetPassword } from './ducks/services';

interface ForgetPasswordFormProps {
  isModalClose: any;
  openLink: any;
}
const ForgetPasswordForm = ({ isModalClose, openLink }: ForgetPasswordFormProps): ReactElement => {
  // const forgetPasswordData = useSelector(({ auth }: RootState) => auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState<any>({});
  const { t } = useTranslation();
  const getResponse = (e: any) => {
    setResponse(e);
  };
  const onFinish = (values: any) => {
    setEmail(values.email);
    isModalClose(false);
    dispatch(forgetPassword({ email, onSuccess: getResponse }));
  };
  useEffect(() => {
    if (response?.success === true) {
      notification.open({
        message: response.message,
      });
    }
  }, [response]);

  return (
    <Form
      name="normal_login"
      className="auth-form-container"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="form-forget-heading">{t('auth.forgetPassword')}</h1>

      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item className="form-row">
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t('auth.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgetPasswordForm;
