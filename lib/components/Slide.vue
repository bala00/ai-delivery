<template>
    <div class="slider">
        <p class="problem-bar">请问患者属于以下哪种人群</p>
        <div class="flex answer-tab">
            <div :class="`table-list ${this.sex == '1'? 'active': ''}`" @click="handlerClick('1')">
                <p>儿童</p>
                <span>≤16岁</span>
            </div>
            <div :class="`table-list ${this.sex == '2'? 'active': ''}`" @click="handlerClick('2')">
                <p>男性</p>
                <span>&gt;16岁</span>
            </div>
            <div :class="`table-list ${this.sex == '3'? 'active': ''}`" @click="handlerClick('3')">
                <p>女性</p>
                <span>&gt;16岁</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['sex'],
  methods: {
    handlerClick (sex) {
      this.$emit('select', sex)
    }
  }
}
</script>

<style scoped>
.answer-tab {
  justify-content: space-between;
}
.table-list {
  width: 30%;
  padding: 5px 0;
  min-width: 40px;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
}
.table-list p {
  font-size: 1.6rem;
  align-items: center;
  text-indent: 5px;
  letter-spacing: 4px;
}
.table-list span {
  font-size: 1.2rem;
  color: #8997a3;
  display: block;
}
.table-list.active {
  color: #fff;
  background-color: #4c87e5;
}
.table-list.active span {
  color: #fff;
}
</style>
