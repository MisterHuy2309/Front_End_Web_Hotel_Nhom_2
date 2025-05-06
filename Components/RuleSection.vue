<template>
    <section class="rule">
      <el-divider class="rule-title" content-position="left">
        {{ number }}. {{ title }}
      </el-divider>
      <p class="text vi">{{ vi }}</p>
      <p class="text en">{{ en }}</p>
      <img :src="image" class="rule-img" :alt="title" />
    </section>
  </template>
  
  <script setup>
  defineProps({
    number: String,
    title: String,
    vi: String,
    en: String,
    image: String
  })
  </script>
  
  <style scoped>
  .rule {
    margin-bottom: 40px;
  }
  
  .rule-title {
    font-weight: bold;
    font-size: 20px;
    color: #409EFF;
  }
  
  .text.vi {
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .text.en {
    font-style: italic;
    color: #666;
    margin-bottom: 10px;
  }
  
  .rule-img {
    width: 100%;
    max-height: 320px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
  }
  </style>
  