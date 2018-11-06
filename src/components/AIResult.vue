<template>
    <div class="slider">
        <p class="problem-bar">"{{this.title}}"</p>
        <div class="answer-tips">{{this.tips}}</div>
        <div class="department-item">
            <div class="input-symptom-desc" >{{this.resultJson.content[0][0].diseaseName}}</div>
            <a :href="`https://fz.baidu.com/preview/registration2.html?department=${this.resultJson.content[0][0].diseaseName}`"> 立即挂号</a>
        </div>
        <div class="department-item department-item-block" v-if="this.resultJson.content.length > 2">
            <p class="disease-tips">其他相关科室推荐(暂不支持线上挂号)</p>
            <div class="department-info">
                <div class="input-symptom-desc">普外科</div>
                <a class="" href="tel:01069006900"> 电话预约</a>
            </div>
        </div>
        <div class="doctor-info">
            <div class="departs"><p>推荐医生</p></div>
            <ul class="doctor-list">
                <li v-for="(item, index) in this.resultJson.doctorInformation[0]" :key="index">
                    <span>
                        <div class="avatar-bar">
                            <img class="avatar" :src="`http://59.108.110.168:8001/${item.picture_url}`" />
                            <!-- http://59.108.110.168:8001/respt/images/download/9bb6a893-03e4-408c-b5ea-a90d90aa58b4.jpg -->
                        </div>
                        <p class="name">{{item.doc_name}}</p>
                        <p>{{item.doc_profession}}</p>
                    </span>
                </li>
            </ul>
        </div>
        <Reload />
    </div>
</template>
<script>
import Reload from './Reload'
export default {
  props: ['title', 'tips', 'resultJson'],
  components: {Reload}
}
</script>
<style scoped>
.department-item{
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.input-symptom-desc {
    font-size: 1.6rem;
    line-height: 1.6rem;
    letter-spacing: 3px;
    color: #4c87e5
}
.department-item-block{
    display: block;
    border-top: 1px solid #f2f2f2
}
.department-info{
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.department-info .input-symptom-desc{
    color: #505050
}
.disease-tips{
    padding-top: 9px;
}
.department-item a {
    text-decoration: none;
    padding: 5px 12px;
    color: #fff;
    background: #4c87e5;
    font-size: 1.6rem;
    letter-spacing: 1px;
    border-radius: 15px;
}
.doctor-info{
    border-top: #f2f2f2 1px solid;
    padding: 10px 0;
}
.departs p, .departs a {
    color: #797979;
    text-decoration: none;
    font-size: 1.4rem;
}
.doctor-list {
    display: flex;
    padding-top: 15px;
    align-items: center;
    justify-content: space-between;
}
.doctor-list li{
    width: 84px;
}
.doctor-list .avatar-bar{
    width: 84px;
    height: 84px;
    overflow: hidden;
    border-radius: 50%;
}
.doctor-list .avatar{
    display: block;
    width: 100%;
}
.doctor-list li p {
    padding: 1px 0;
    font-size: 1.2rem;
    color: #797979;
    white-space: nowrap;
    text-align: center
}
.doctor-list li p.name{
    color: #505050;
}
</style>
