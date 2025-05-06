<template>
  <div :class="['rules-wrapper', { 'dark': theme.isDarkMode }]">
    <TheHeader />

    <main class="rules-content">
      <el-card class="rules-card">
        <h1 class="title">📜 Nội quy khách sạn</h1>

        <RuleSection
          number="1"
          title="Xuất trình giấy tờ"
          vi="📌 Quý khách vui lòng xuất trình đầy đủ giấy tờ hợp lệ như CMND hoặc Hộ chiếu còn hạn thị thực để khách sạn đăng ký."
          en="👉 Please present your valid ID or Passport with visa at check-in."
          image="https://www.pinterest.com/pin/38632509300511548"
        />

        <RuleSection
          number="2"
          title="Giờ nhận & trả phòng"
          vi="🕒 Nhận phòng từ 14:00 và trả phòng trước 12:00 trưa. Trễ giờ có thể tính thêm phí."
          en="👉 Check-in from 14:00 and check-out before 12:00 noon. Late check-out may incur a fee."
          image="https://images.unsplash.com/photo-1559599189-14d4c7f7cde5?auto=format&fit=crop&w=800&q=80"
        />

        <RuleSection
          number="3"
          title="Chìa khóa phòng"
          vi="🔑 Vui lòng trả lại chìa khóa khi check-out. Mất chìa khóa sẽ bị tính phí theo quy định."
          en="👉 Please return your key at check-out. Lost key will be charged accordingly."
          image="https://images.unsplash.com/photo-1588774069262-3b23e0f8fc4b?auto=format&fit=crop&w=800&q=80"
        />
      </el-card>
    </main>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/store/DarkMode'
import TheHeader from '../Components/Header.vue'
import RuleSection from '../Components/RuleSection.vue'

const theme = useThemeStore()
theme.initializeDarkMode()
</script>

<style scoped>
.rules-wrapper {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fb, #e6edf5);
  color: #333;
  transition: all 0.3s ease;
}

.rules-wrapper.dark {
  background: linear-gradient(to right, #1f2c3c, #15202b);
  color: #f0f0f0;
}

.rules-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 50px 20px;
}

.rules-card {
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  background-color: white;
}

.rules-wrapper.dark .rules-card {
  background-color: #2a3a4a;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.rules-wrapper.dark .title {
  color: #ffffff;
}
</style>
