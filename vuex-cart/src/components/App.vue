<template>
  <div id="app">
    <h1>购物车例子</h1>
    <hr>
    <h2>商品</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import Cart from './Cart.vue'

export default {
  components: { ProductList, Cart }
}
</script>
