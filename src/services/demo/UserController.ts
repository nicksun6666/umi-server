/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
console.log(LOCAL_ENV);

const url = LOCAL_ENV === 'production' ? 'http://111.230.44.136:3002' : '/api'

/** 此处后端没有提供注释 GET v1/queryUserList */
export async function queryUserList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(`${url}/v1/queryUserList`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST v1/user */
export async function addUser(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`${url}/v1/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET v1/user/${param0} */
export async function getUserDetail(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`${url}/v1/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT v1/user/${param0} */
export async function modifyUser(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`${url}/v1/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE v1/user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_string_>(`${url}/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE v1/user/${param0} */
export async function userLogin(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`${url}/user/login`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function userRegister(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`${url}/user/register`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function userForgotPassword(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`${url}/user/forgot-password`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
