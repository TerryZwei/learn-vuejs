'use strict'

import list from '../views/list-views'
import listDefault from '../components/list-default'

export default function (router) {
  router.map({
    '/': {
      component: list,
      subRoutes: {
        '/': {
          // 匹配路由/ 里面的router-view
          component: listDefault
        }
        // '/theme/:id': {
        //   name: 'theme',
        //   component: listTheme
        // },
        // '/author/:id': {
        //   name: 'author',
        //   component: author
        // }
      }
    }

    // '/detail/:id': {
    //     name: 'detail',
    //     component: detail
    // },
    // '/comments': {
    //     component: comments
    // },
    // '/recommenders': {
    //     component: recommenders
    // },
    // '/section': {
    //     component: section
    // },
    // '/editors': {
    //     component: editors
    // }
  })
}
