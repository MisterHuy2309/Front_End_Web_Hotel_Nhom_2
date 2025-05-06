<template>
  <div :class="{'dark': theme.isDarkMode}">
    <NuxtPage />
  </div>
</template>
<script setup>
import { useThemeStore } from './store/DarkMode' // Đảm bảo rằng store này đã được tạo và xuất khẩu đúng cách
import { useHead } from '#app' // Nhập useHead từ Nuxt

// Sử dụng Pinia store
const theme = useThemeStore();

// Khi component được load, kiểm tra và áp dụng dark mode
theme.initializeDarkMode();

// Toggle chế độ dark mode
const toggleTheme = () => {
  theme.toggleDarkMode();
};
import { useLanguageStore } from './store/Language';

const languageStore = useLanguageStore();
languageStore.initializeLanguage();
// Quản lý thẻ head
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/element-plus/dist/index.css' },
    { rel: 'stylesheet', href: 'https://unpkg.com/vuestic-ui/dist/vuestic-ui.css' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
    // Thêm thư viện Material Icons
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    // Thêm thư viện Remix Icons
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css' },
    // Thêm thư viện Feather Icons
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.css' },
    // Thêm thư viện Ionicons
    { rel: 'stylesheet', href: 'https://unpkg.com/ionicons@5.5.2/dist/css/ionicons.min.css' }
  ],
  script: [
    { src: 'https://cdn.tailwindcss.com' },
    { src: 'https://unpkg.com/vue@3/dist/vue.global.js' },
    { src: 'https://cdn.jsdelivr.net/npm/element-plus' },
    { src: 'https://unpkg.com/vuestic-ui' },
    { src: 'https://cdn.jsdelivr.net/npm/qrcode.vue@3.4.1/dist/qrcode.vue.browser.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/chart.js' },
    { src: 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js' }
  ]
});
</script>

<style scoped>

</style>
