import services from '@/services/demo';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import day from 'dayjs'
import { history } from 'umi';
import styles from './index.less';

const { userForgotPassword } =
  services.UserController;

const ForgotPasswordPage: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values, day(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
    try {
      const {success,msg,data} = await userForgotPassword({...values, 
        modify_time: day(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      });
      if(success){
        message.success('密码重置成功')
        history.push('/login')
      }else{
        message.error(msg)
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label="Confirm Password"
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
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordPage;
