/* eslint-disable no-debugger */
import React, { ReactElement, useEffect, useState } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/rootState';
import { isRegister } from './ducks/services';
import 'react-phone-input-2/lib/high-res.css';
import './style.less';
import { UserData } from './ducks/types';

interface RegisterFormProps {
  isModalClose: any;
  openLink: any;
}
const RegisterForm = ({ isModalClose, openLink }: RegisterFormProps): ReactElement => {
  const { isLoading, loginErrorMessage } = useSelector(({ auth }: RootState) => auth);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState<UserData>();
  // const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const getResponse = (user: any) => {
    setResponse(user);
    openLink(true);
  };
  const onFinish = (values: any) => {
    dispatch(isRegister({ email, name, phone, device_type: 'web', onSuccess: getResponse }));
  };

  useEffect(() => {
    if (response?.success === true) {
      notification.open({
        message: response.message,
      });
      isModalClose(false);
    }
  }, [response]);
  useEffect(() => {
    if (loginErrorMessage === '422') {
      notification.open({
        message: `${t('auth.registerInvalidError')}`,
      });
    }
  }, [loginErrorMessage]);
  const onClickLogin = () => {
    isModalClose(false);
    openLink(true);
  };

  const onHandleChange = (
    _: any,
    allValues: {
      email: React.SetStateAction<string>;
      name: React.SetStateAction<string>;
      phone: React.SetStateAction<string>;
    },
  ) => {
    setEmail(allValues.email);
    setName(allValues.name);
    setPhone(allValues.phone);
  };

  return (
    <Form
      onValuesChange={onHandleChange}
      form={form}
      name="register"
      className="auth-form-container"
      onFinish={onFinish}
    >
      <h1 className="form-heading">{t('auth.register')}</h1>
      <Spin spinning={isLoading}>
        <Form.Item
          name="name"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: `${t('auth.nameError')}`, whitespace: true }]}
        >
          {/* 'Please input your Name!' */}
          <Input placeholder={t('auth.name')} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: `${t('auth.invalidEmailError')}`,
              // 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: `${t('auth.emailError')}`,
              // 'Please input your E-mail!'
            },
          ]}
        >
          <Input placeholder={t('auth.email')} />
        </Form.Item>

        {/* <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item> */}

        <Form.Item
          className="phone-input"
          name="phone"
          rules={[{ required: true, message: `${t('auth.phoneError')}` }]}
        >
          {/* 'Please input your phone number!' */}
          <PhoneInput
            country="sa"
            masks={{ sa: '(...) ...-...-...' }}
            placeholder="(...) ...-...-..."
            inputClass="phone-field"
          />
        </Form.Item>
        <Form.Item className="form-row">
          <Button type="primary" htmlType="submit">
            {t('auth.register')}
          </Button>
          <span className="form-span">{t('auth.or')}</span>{' '}
          <a role="link" tabIndex={0} onClick={onClickLogin}>
            {t('auth.login')}
          </a>
        </Form.Item>
      </Spin>
    </Form>
  );
};

export default RegisterForm;
