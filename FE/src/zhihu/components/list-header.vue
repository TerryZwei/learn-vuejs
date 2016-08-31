<template>
  <div class="list-header">
    <div class="header-icon" @click="showBar"><i class="iconfont">&#xe612</i></div>
    <div class="header-cont"><p>首页</p></div>
    <div class="header-icon"><i class="iconfont">&#xe610</i></div>
    <div class="header-icon"><i class="iconfont">&#xe619</i></div>
  </div>
</template>

<script>
  export default{
    props: ['showSidebar'],
    data () {
      return {
      }
    },
    methods: {
      showBar () {
        this.showSidebar = !this.showSidebar
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .iconfont {
    font-family: "iconfont";
    font-size: 19px;
    font-style: normal;
    color: #ffffff;
  }
  
  .list-header {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #00a2ea;
    z-index: 4;
    .header-icon {
      flex: 1;
      text-align: center;
      i {
        line-height: 50px;
      }
    }
    .header-cont{
      flex: 6;
      padding-left: 10px;
      p{
        line-height: 50px;
        color: #ffffff;
        font-size:16px;
      }
    }
  }
</style>