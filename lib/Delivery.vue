<template>
    <div class="container ai-delivery">
        <div class="card-bar" v-if="!barVisible">
            <Tips/>
            <Slide :sex="duNurse.sex" @select="handlerSelect" />
        </div>
        <Search @search="search" v-if="searchVisible" />
        <NoFind v-if="resultJson.type == 'question'" :query="duNurse.query"></NoFind>
        <RadioSelect v-if="resultJson.type == 'radioBox'" :title="radioText" :tips="radioTips" :entitiesList="entitiesList" @handlerRadio="handlerRadio" />
        <AIResult v-if="resultJson.type=='disease'" :title="resultText" :tips="resultTips" :resultJson="resultJson" />
        <div class="card-bar after" v-show="barVisible">
          <Tips/>
          <Slide />
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
// import { Tips, Slide, Search, NoFind, Reload, RadioSelect, AIResult } from './components/index'
import Tips from './components/Tips'
import Search from './components/Search'
import Slide from './components/Slide'
import NoFind from './components/NoFind'
import Reload from './components/Reload'
import RadioSelect from './components/RadioSelect'
import AIResult from './components/AIResult'
Vue.use(VueJsonp)
export default {
  components: {
    Tips,
    Search,
    Slide,
    NoFind,
    Reload,
    RadioSelect,
    AIResult
  },
  data () {
    return {
      searchVisible: false,
      barVisible: false,
      duNurse: {
        id: 10001,
        type: '',
        query: '',
        sex: '',
        age: '',
        isChild: 0,
        sessionId: '',
        stamp: new Date().getTime()
      },
      radioText: '',
      radioTips: '',
      entitiesList: [],
      resultText: '',
      resultTips: '',
      resultJson: {}
    }
  },
  methods: {
    handlerSelect (sex) {
      this.searchVisible = true
      this.duNurse.sex = sex
      this.duNurse.age = sex === '1' ? '小于14岁' : '大于14岁'
      this.duNurse.isChild = sex === '1' ? 1 : 0
    },
    jsonp (type) {
      this.$jsonp('https://fz.baidu.com/duNurse', this.duNurse).then(json => {
        this.resultJson = json
        this.duNurse.sessionId = json.sessionId
        if (json.type === 'radioBox') {
          if (type === 'search') {
            this.radioText = this.duNurse.query
            this.radioTips = '请问，您是否出现了以下症状呢?'
          } else {
            this.radioText = '请问，您是否出现了以下症状呢?'
            this.radioTips = ''
          }

          this.entitiesList = []
          json.content.entities.map((item, index) => {
            this.entitiesList.push({
              title: item.title,
              num: 0
            })
          })
        } else if (json.type === 'disease') {
          if (type === 'search') {
            this.resultText = this.duNurse.query
            this.resultTips = '通过分析您的回答，建议您去以下科室挂号'
          } else {
            this.resultText = '通过分析您的回答，建议您去以下科室挂号'
            this.resultTips = ''
          }
        }
      })
        .catch(err => {
          console.log('err:', err)
        })
    },
    search (query) {
      this.duNurse.query = query
      this.jsonp('search')
      this.searchVisible = false
      this.barVisible = true
    },
    handlerRadio (result) {
      let radio = result.map((item) => {
        return item.title + '_' + item.num
      })
      let _query = radio.join(',')
      this.duNurse.query = 'radio:' + _query
      this.jsonp('radio')
    }
  }
}
</script>
<style>
@import './font/iconfont.css';
html, body{
  width: 100vw;
  min-height: 100vh;
  font-size: 10px;
  overflow: hidden;
  background-color: #f2f2f2
}
.ai-delivery .slider {
  margin-bottom: 20px;
  padding: 15px 5%;
  border-radius: 5px;
  background-color: #fff;
}
.ai-delivery .problem-bar {
  padding-bottom: 10px;
  font-size: 1.6rem;
  line-height: 1.8rem;
  overflow: hidden;
  color: #505050;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ai-delivery .answer-tips, .disease-tips {
  font-size: 1.4rem;
  line-height: 1.6rem;
  padding-bottom: 4px;
  color: #797979;
}
.ai-delivery .flex{
  display: flex;
  align-items: center;
}
.ai-delivery .flex-auto{
  flex: 1 1 auto;
}
.ai-delivery .flex-no{
  flex: 0 0 auto;
}
</style>
<style scoped>
.container{
  margin: auto;
  width: 90%;
  height: 100vh;
}
.card-bar.after {
  position: fixed;
  width: 90%;
  left: 5%;
  bottom: 0;
  background-color: #f2f2f2;
}
</style>
