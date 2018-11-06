<template>
    <div class="slider">
        <p class="problem-bar">"{{this.title}}"</p>
        <div class="answer-tips">{{this.tips}}</div>
        <ul class="symptom-content">
            <li class="items" v-for="(item, index) in this.entitiesList" :data-checked="`${num.indexOf(item.title) === -1 ? 'false' : 'true'}`" :key="index" @click="handlerClick(item, index)">{{item.title}}</li>
            <li :data-checked="`${not=== 0 ? 'true' : 'false'}`" @click="handlerNot(0)">都没有</li>
            <li :data-checked="`${not=== 2 ? 'true' : 'false'}`" @click="handlerNot(2)">都不知道</li>
        </ul>
        <div class="symptom-submit active" v-if="num.length > 0 || not > -1 " @click="submit">确定</div>
        <div class="symptom-submit" v-else>确定</div>
    </div>
</template>
<script>
export default {
  props: ['title', 'tips', 'entitiesList'],
  data () {
    return {
      data: [],
      not: -1,
      num: []
    }
  },
  methods: {
    handlerNot (e) {
      this.not = e
      this.data = []
      this.num = []
    },
    handlerClick (item, index) {
      this.not = -1
      let _title = item.title
      let _indexof = this.num.indexOf(_title)
      if (_indexof === -1) {
        this.num.push(_title)
      } else {
        this.num.splice(_indexof, 1)
      }
    },
    submit () {
      let result = []
      if (this.num.length > 0) {
        result = this.entitiesList.map((item) => {
          if (this.num.indexOf(item.title) === -1) {
            return { title: item.title, num: 0 }
          } else {
            return { title: item.title, num: 1 }
          }
        })
      } else {
        result = this.entitiesList.map((item) => {
          return { title: item.title, num: this.not }
        })
      }
      this.data = []
      this.not = -1
      this.num = []
      this.$emit('handlerRadio', result)
    }
  }
}
</script>
<style scoped>
.symptom-content li {
  padding: 5px 9px;
  font-size: 1.4rem;
  border-radius: 10px;
  margin: 5px;
  color: #48525b;
  cursor: pointer;
  letter-spacing: 1px;
  display: inline-block;
  background-color: #f2f2f2;
}
.symptom-submit {
  width: 100%;
  height: 36px;
  border-radius: 30px;
  text-align: center;
  font-size: 1.6rem;
  line-height: 36px;
  color: #8997a3;
  margin-top: 10px;
  background-color: #f2f2f2;
}
.symptom-content li[data-checked="true"], .symptom-submit.active{
    background-color: #4c87e5;
    color: #fff;
}
</style>
