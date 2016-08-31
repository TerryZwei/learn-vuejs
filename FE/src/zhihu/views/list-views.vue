<template>
  <div class="main-list" id="main">
    <!-- 顶部view -->
    <list-header :show-sidebar.sync="showSidebar"></list-header>
    <!-- 侧边栏 -->
    <side-bar :show-sidebar.sync="showSidebar"></side-bar>
    <!-- 遮罩层 -->
    <div v-if="showSidebar" class="sidebar-mask" @click="hideMask"></div>
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
  },
  data () {
    return {
      showSidebar: false
    }
  },
  methods: {
    hideMask () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import "../assets/css/reset";
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1467357626_5109937.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1467357626_5109937.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/font_1467357626_5109937.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/font_1467357626_5109937.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_1467357626_5109937.svg#iconfont') format('svg'); /* iOS 4.1- */
  }
  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateZ(0);
    z-index: 5;
    background: rgba(0, 0, 0, 0.7);
  }
</style>
