import Vue from 'vue';
import App from './App';
import Home from './components/Home';
import TimeEntries from './components/TimeEntries';
import LogTime from './components/LogTime';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 注册两个组件
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter();
//
router.map({
  '/home': {
    component: Home,
  },
  '/time-entries': {
    component: TimeEntries,
    subRoutes: {
      '/log-time': {
        component: LogTime,
      },
    },
  },
});

// router.redirect({
//   '*': '/home',
// });

router.start(App, '#app');
