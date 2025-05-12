<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->
<!-- Trang Thọ Code xin đừng động vào  -->

<template>
  <div class="login-page min-h-screen w-full flex">
    <!-- Phần hình ảnh bên trái với slideshow -->
    <div class="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-900">
      <div v-for="(image, index) in hotelImages" 
           :key="index"
           class="absolute inset-0 w-full h-full"
           :class="{ 'active': currentImageIndex === index }">
           <img :src="image" 
                :alt="`Luxury Hotel ${index + 1}`" 
                class="w-full h-full object-cover transform transition-all duration-1000 ease-in-out"
                :class="{
                  'opacity-100 scale-100': currentImageIndex === index,
                  'opacity-0 scale-110': currentImageIndex !== index
                }">
      </div>
      <div class="relative h-full w-full bg-black bg-opacity-50 flex items-center justify-center p-12 z-30 backdrop-blur-sm">
        <div class="text-white max-w-xl">
          <h1 class="text-4xl font-bold mb-4">Tận hưởng kỳ nghỉ sang trọng của bạn</h1>
          <p class="text-lg">Khám phá trải nghiệm lưu trú độc đáo và đẳng cấp tại khách sạn của chúng tôi. Đặt phòng ngay hôm nay!</p>
        </div>
      </div>
    </div>
    
    <!-- Phần form login bên phải -->
    <div class="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 md:p-12">
      <div class="w-full max-w-md">
        <!-- Tiêu đề -->
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold text-gray-800">Đăng nhập</h1>
          <p class="text-gray-500 mt-2">
            Chưa có tài khoản? 
            <a href="/Register" class="text-blue-600 font-medium hover:underline">Đăng ký ngay</a>
          </p>
        </div>
        
        <!-- Form đăng nhập -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ email</label>
            <va-input 
              v-model="formEmail" 
              id="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              class="w-full login-input"
              required
            />
          </div>
          
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <a href="/ForgotPass" class="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
            </div>
            <va-input
              v-model="formPassword"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nhập mật khẩu"
              class="w-full login-input"
              required
            >
              <template #append>
                <va-button
                  icon
                  size="small"
                  color="gray"
                  @click="togglePassword"
                >
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </va-button>
              </template>
            </va-input>
          </div>
          
          <div class="mb-6">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600 rounded">
              <span class="ml-2 text-sm text-gray-700">Ghi nhớ đăng nhập</span>
            </label>
          </div>
          
          <va-button
            type="submit" 
            class="w-full py-3 rounded-lg"
            color="#1a73e8"
          >
            Đăng nhập
          </va-button>
        </form>
        
        <!-- Thông báo đăng nhập thành công -->
        <va-alert
          v-if="email"
          class="mt-6"
          color="success"
          outlined
        >
          <p>{{ email }}</p>
        </va-alert>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from '@/composables/useLogin'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
  email,
  formEmail,
  formPassword,
  showPassword,
  togglePassword,
  emailLogin,
} = useLogin()

const handleSubmit = async () => {
  if (emailLogin()) {
    await router.push('/')
  }
}

// Mảng chứa đường dẫn các hình ảnh khách sạn
const hotelImages = [
  '/images/hotel-luxury-1.jpg',
  '/images/hotel-luxury-2.jpg',
  '/images/hotel-luxury-3.jpg',
  '/images/hotel-luxury-4.jpg'
]

const currentImageIndex = ref(0)
let slideInterval

// Hàm chuyển đổi hình ảnh với hiệu ứng fade
const nextImage = () => {
  const nextIndex = (currentImageIndex.value + 1) % hotelImages.length
  currentImageIndex.value = nextIndex
}

// Khởi tạo slideshow và preload images
onMounted(async () => {
  // Preload images trước
  await Promise.all(hotelImages.map(src => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.src = src
    })
  }))

  // Bắt đầu slideshow sau khi tải xong ảnh
  slideInterval = setInterval(nextImage, 4000)
})

// Dọn dẹp interval khi component bị destroy
onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
.active {
  z-index: 20;
}

@keyframes zoomInOut {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

img.opacity-100 {
  animation: zoomInOut 20s infinite;
}

:deep(.va-button) {
  letter-spacing: normal;
  text-transform: none;
  font-weight: 600;
}

:deep(.login-input .va-input__container) {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  transition: all 0.3s ease;
}

:deep(.login-input .va-input__field) {
  padding: 14px 16px;
  font-size: 15px;
}

:deep(.login-input .va-input__container:focus-within) {
  border-color: #1a73e8;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.15);
}

.form-checkbox {
  accent-color: #1a73e8;
}
</style>
