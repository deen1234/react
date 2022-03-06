/* eslint-disable no-debugger */
import React, { ReactElement, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { errorCheck, userLogged } from 'app/modules/Auth/ducks/slice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/rootState';
import { isLogIn } from './ducks/services';
import './style.less';
import { UserData } from './ducks/types';

interface LoginFormProps {
  isModalClose: any;
  openLink: any;
  onForget: any;
}
const LoginForm = ({ isModalClose, openLink, onForget }: LoginFormProps): ReactElement => {
  // const isLogged = useSelector(({ auth }: RootState) => auth.isLogged);
  const { loginErrorMessage, isLoading } = useSelector(({ auth }: RootState) => auth);

  // const logInData = useSelector(({ auth }: RootState) => auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<UserData>();
  const { t } = useTranslation();
  const setUserFunc = (res: any) => {
    setUser(res);
    if (res) {
      localStorage.setItem('token', res?.data?.user?.access_token);
      dispatch(userLogged());
    }
  };

  const onFinish = async (values: any) => {
    dispatch(
      isLogIn({
        body: {
          email,
          password,
          device_type: 'web',
        },
        onSuccess: setUserFunc,
      }),
    );
  };
  useEffect(() => {
    if (user?.success === true) {
      notification.open({
        message: user.message,
      });
      isModalClose(false);
    }
  }, [user]);

  useEffect(() => {
    if (loginErrorMessage === '403') {
      notification.open({
        message: 'Invalid Email or Password',
      });
      dispatch(errorCheck());
    }
  }, [loginErrorMessage]);

  const onClickRegister = () => {
    isModalClose(false);
    openLink(true);
  };

  const onClickForget = () => {
    isModalClose(false);
    onForget(true);
  };

  const onHandleChange = (
    _: any,
    allValues: {
      email: React.SetStateAction<string>;
      password: React.SetStateAction<string>;
    },
  ) => {
    setEmail(allValues.email);
    setPassword(allValues.password);
  };

  return (
    <Form
      onValuesChange={onHandleChange}
      name="normal_login"
      className="auth-form-container"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="form-heading">{t('auth.login')}</h1>
      <Spin spinning={isLoading}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: `${t('auth.invalidEmailError')}`,
            },
            {
              required: true,
              message: `${t('auth.emailError')}`,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t('auth.email')}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: `${t('auth.passwordError')}` }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('auth.password')}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t('auth.rememberMe')}</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" role="link" tabIndex={0} onClick={onClickForget}>
            {t('auth.forgetPassword')}
          </a>
        </Form.Item>

        <Form.Item className="form-row">
          <Button type="primary" htmlType="submit" className="login-form-button">
            {t('auth.login')}
          </Button>
          <span className="form-span">{t('auth.or')}</span>{' '}
          <a role="link" tabIndex={0} onClick={onClickRegister}>
            {t('auth.registerNow')}
          </a>
        </Form.Item>
      </Spin>
    </Form>
  );
};

export default LoginForm;
