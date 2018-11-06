<template>
    <div class="reload-page">
        如果对结果有疑问，您可以<span class="reload-delivey" @click="handlerClick">重新问诊</span>
    </div>
</template>
<script>
export default {
  inject: ['reload'],
  methods: {
    handlerClick () {
      this.reload()
    }
  }
}
</script>
<style scoped>
.reload-page {
  font-size: 1.4rem;
  letter-spacing: 1px;
  color: #505050;
  border-top: #f2f2f2 1px solid;
  padding-top: 15px;
}
.reload-delivey {
  color: #4c87e5;
  cursor: pointer;
}
</style>
