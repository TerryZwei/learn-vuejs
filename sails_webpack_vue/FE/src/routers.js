'use strict'

import list from './view/list.vue'

export default function(router){
    router.map({
        '/': {
            component: list
        }
    });
}