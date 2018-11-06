<template>
    <div class="container">
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
export default {
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
        console.log('json111--->', json)
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
          console.log('type-->', type)
          if (type === 'search') {
            this.resultText = this.duNurse.query
            this.resultTips = '通过分析您的回答，建议您去以下科室挂号'
          } else {
            console.log('haha')
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
<style scoped>
.card-bar.after {
  position: fixed;
  width: 90%;
  left: 5%;
  bottom: 0;
  background-color: #f2f2f2;
}
</style>
