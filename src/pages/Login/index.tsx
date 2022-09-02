import services from '@/services/demo';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { history, Link } from 'umi';
import { useModel } from '@umijs/max';
import styles from './index.less';

const { userLogin } =
  services.UserController;

const LoginPage: React.FC = () => {
  const { name, setName } = useModel('global');

  const onFinish = async (values: any) => {
    try {
      const {success, msg, data} = await userLogin({...values,
      });
      if(success){
        message.success('登录成功')
        if(localStorage.getItem('token')){
          localStorage.setItem('token', '')
        }
        localStorage.setItem('token', data!.token as string)
        setName(data!.username as string)
        history.push('/home')
      }else{
        message.error(msg)
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/forgot_password">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
