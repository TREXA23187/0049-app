import AsyncLoadable from '@/utils/AsyncLoadable';

// 首页
const Index = AsyncLoadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index/Index'));

const routes = [{ path: '/index', exact: true, name: '首页', component: Index }];

export default routes;
