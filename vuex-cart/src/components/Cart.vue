<template>
  <div>
    <h2>购物车</h2>
    <p v-show="!products.length">请加一些商品进购物车</p>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price }} x {{ p.quantity }}
      </li>
    </ul>
    <p>总共：{{ total }}</p>
    <p>
      <button :disabled="!products.length" @click="checkout(products)">结算</button>
    </p>
    <p v-show="checkoutStatus">结算 {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
</script>
