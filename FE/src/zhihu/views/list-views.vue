<template>
  <div class="main-list" id="main">
    <!-- 顶部view -->
    <list-header></list-header>
    <!-- 侧边栏 -->
    <side-bar></side-bar>
    <!-- 遮罩层 -->
    <div></div>
    <!-- 主页内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import listHeader from '../components/list-header'
import sideBar from '../components/side-bar'

export default {
  components: {
    sideBar,
    listHeader
  }
}
</script>