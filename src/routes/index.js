import AsyncLoadable from '@/utils/AsyncLoadable';

// index
const Index = AsyncLoadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index/Index'));

// editor
const Editor = AsyncLoadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Editor'));

// instance
const Instance = AsyncLoadable(() => import(/* webpackChunkName: 'instance' */ '@/views/Console/Instance'));

// template
const Template = AsyncLoadable(() => import(/* webpackChunkName: 'template' */ '@/views/Console/Template'));

// model
const Model = AsyncLoadable(() => import(/* webpackChunkName: 'model' */ '@/views/Console/Model'));

// task
const Task = AsyncLoadable(() => import(/* webpackChunkName: 'model' */ '@/views/Console/Task'));

// docs
const Docs = AsyncLoadable(() => import(/* webpackChunkName: 'docs' */ '@/views/Docs'));

// interface
const Interface = AsyncLoadable(() => import(/* webpackChunkName: 'interface' */ '@/views/Interface'));

const routes = [
    { path: '/index', exact: true, name: 'index', component: Index },
    { path: '/console/instance', exact: true, name: 'instance', component: Instance },
    { path: '/console/template/editor', exact: true, name: 'editor', component: Editor },
    { path: '/console/template', exact: true, name: 'template', component: Template },
    { path: '/console/model', exact: true, name: 'model', component: Model },
    { path: '/console/task', exact: true, name: 'task', component: Task },
    { path: '/docs', exact: true, name: 'docs', component: Docs },
    { path: '/interface/:instance', exact: true, name: 'interface', component: Interface }
];

export default routes;
