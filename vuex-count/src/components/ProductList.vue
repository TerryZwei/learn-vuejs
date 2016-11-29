<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price }}
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  // 组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在
  created () {
    // actions
    this.$store.dispatch('getAllProducts')
  }
}
</script>
