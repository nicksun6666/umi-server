// 运行时配置
import { RunTimeLayoutConfig } from '@umijs/max';
import './app.less'

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout:RunTimeLayoutConfig = (initialState) => {
  
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    logout: ()=>{
      console.log(1123);
      
    },
    contentStyle: {width: '100%', height:'100%',margin: '0', padding:'20px'}
    // 默认布局调整
    // rightContentRender: () => <DefaultLayout />,
  };
};
