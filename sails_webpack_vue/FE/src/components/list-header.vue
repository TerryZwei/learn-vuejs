<template>
  <div class="list-header">
    <div class="header-icon" @click="showBar"><i class="iconfont">&#xe612</i></div>
    <div v-if="!tip" class="header-cont"><p>{{title}}</p></div>
    <div v-if="tip" class="header-cont"><p>{{tip | dateTime}}</p></div>
    <div class="header-icon" v-show="iconDisplay" ><i class="iconfont">&#xe610</i></div>
    <div class="header-icon" v-show="iconDisplay" @click="changeMode"><i class="iconfont">&#xe619</i></div>
  </div>
</template>

<script>
    export default{
        props: ['showSidebar', 'title', 'iconDisplay', 'tip'],
        data () {
            return {
                nightStyle: false
            }
        },
        methods: {
            showBar () {
                window.document.body.className = 'scroll-top'
                window.document.querySelector('html').className = 'scroll-top'
                this.showSidebar = !this.showSidebar
            }
        },
        changeMode () {
            if (!this.nightStyle) {
                window.document.getElementById('app').className = 'night-style'
            } else {
                window.document.getElementById('app').className = ''
            }
            this.nightStyle = !this.nightStyle
        }
    }
</script>
<style rel="stylesheet/css">
.iconfont {
    font-family:"iconfont";
    font-size:19px;
    font-style:normal;
    color: #ffffff;
}
.list-header {
    position: fixed;
    transform: translateZ(0);
    top: 0;
    z-index: 4;
    height: 50px;
    width: 100%;
    background: #00A2EA;
    display: flex;
    flex-direction: row;
    
}
.list-header .header-icon {
    flex:1;
    text-align: center;
}
.header-icon i{
    line-height: 53px;
}
.list-header .header-cont {
    flex: 6;
    padding-left: 10px;
      
}
.header-cont p{
    line-height: 50px;
    color: #ffffff;
    font-size:16px;
}
</style>