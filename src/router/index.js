import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ArticleList from '../pages/article/ArticleList'
import ArticleAdd from '../pages/article/ArticleAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Article_List',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/Article_Add',
      name: 'ArticleAdd',
      component: ArticleAdd
    }
  ]
})
