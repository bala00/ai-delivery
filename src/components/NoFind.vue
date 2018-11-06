<template>
    <div class="slider">
        <p class="problem-bar">"{{query}}"</p>
        <div class="input-symptom-desc">请您输入疾病名称或者症状，如高血压、咳嗽、头痛等</div>
        <Reload />
    </div>
</template>
<script>
export default {
  props: ['query']
}
</script>
<style scoped>
@import '../assets/style/slide.css';
.input-symptom-desc{
    color: #4c87e5;
    letter-spacing: 1px;
    font-size: 1.4rem;
    padding-bottom: 15px;
}
</style>
