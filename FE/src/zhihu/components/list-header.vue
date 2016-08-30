<template>
  <div class="list-header">
    <div class="header-icon"><i class="iconfont">&#xe612</i></div>
  </div>
</template>

<script>
  export default{
    props: [],
    data () {
      return {
      }
    },
    methods: {

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
  }
</style>