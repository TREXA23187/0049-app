import AsyncLoadable from '@/utils/AsyncLoadable';

// index
const Index = AsyncLoadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index/Index'));

// editor
const Editor = AsyncLoadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Editor'));

// repository
const Console = AsyncLoadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Console'));

const routes = [
    { path: '/index', exact: true, name: 'index', component: Index },
    { path: '/editor', exact: true, name: 'editor', component: Editor },
    { path: '/console', exact: true, name: 'console', component: Console }
];

export default routes;
