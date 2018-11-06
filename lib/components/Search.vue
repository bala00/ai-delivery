<template>
    <div class="flex search-bar">
        <div class="flex flex-no search-icon"><i class="iconfont icon-shuru"></i></div>
        <input class="flex-auto search" v-model="query" type="text" maxlength="30" placeholder="请您输入疾病或症状">
        <div class="flex-no search-btn" @click="submit"><i class="iconfont icon-jiantou-you-cuxiantiao-fill"></i></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style scoped>
.search-bar {
  position: fixed;
  width: 90%;
  height: 40px;
  bottom: 3%;
  left: 5%;
  z-index: 1111;
  border-radius: 26px;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 #cfcfcf;
}
.search-icon {
  width: 60px;
  height: 40px;
  top: 0;
  left: 0;
  z-index: 2222;
  justify-content: center;
}
.search-icon i {
  color: #b6b6b6;
  font-size: 2.6rem;
}
.search {
  height: 40px;
  font-size: 1.4rem;
  width: 89%;
  border: 0;
  outline: none;
}
.search-btn {
  padding-top: 4px;
  height: 40px;
  width: 10%;
  top: 0;
  right: 1%;
  z-index: 2222;
  box-sizing: border-box;
}
.search-btn i {
  color: #3385ff;
  font-size: 3rem;
}
</style>
