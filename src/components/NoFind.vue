<template>
    <div class="slider">
        <p class="problem-bar">"{{query}}"</p>
        <div class="input-symptom-desc">请您输入疾病名称或者症状，如高血压、咳嗽、头痛等</div>
        <Reload />
    </div>
</template>
<script>
import Reload from './Reload'
export default {
  props: ['query'],
  components: { Reload }
}
</script>
<style scoped>
.input-symptom-desc{
    color: #4c87e5;
    letter-spacing: 1px;
    font-size: 1.4rem;
    padding-bottom: 15px;
}
</style>
