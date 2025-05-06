

<template>
  <div class="set-password-page min-h-screen flex items-center justify-center bg-white">
    <div class="set-password-container max-w-md w-full px-6 py-8">
      <!-- Icon khóa -->
      <div class="flex justify-center mb-6">
        <div class="lock-icon w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      <!-- Tiêu đề và nội dung -->
      <h1 class="text-2xl font-semibold text-center mb-2">Set new password</h1>
      <p class="text-center text-gray-600 text-sm mb-6">
        Your new password must be different to<br>
        previously used passwords.
      </p>
      
      <!-- Form đặt lại mật khẩu -->
      <form @submit.prevent="resetPassword" class="space-y-4">
        <!-- Mật khẩu mới -->
        <div>
          <label for="password" class="block text-sm text-gray-700 mb-1">Password</label>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <!-- Xác nhận mật khẩu -->
        <div>
          <label for="confirmPassword" class="block text-sm text-gray-700 mb-1">Confirm password</label>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="confirmPassword" 
            v-model="confirmPassword"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <!-- Yêu cầu mật khẩu -->
        <div class="space-y-2 mt-4">
          <div class="flex items-center">
            <div :class="['w-4 h-4 rounded-full flex-shrink-0', hasMinLength ? 'bg-purple-600' : 'bg-gray-200']"></div>
            <span class="ml-2 text-xs text-gray-600">Must be at least 8 characters</span>
          </div>
          <div class="flex items-center">
            <div :class="['w-4 h-4 rounded-full flex-shrink-0', hasSpecialChar ? 'bg-purple-600' : 'bg-gray-200']"></div>
            <span class="ml-2 text-xs text-gray-600">Must contain one special character</span>
          </div>
        </div>
        
        <!-- Nút reset mật khẩu -->
        <button 
          type="submit" 
          class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-md transition mt-6"
          :disabled="!isFormValid"
        >
          Reset password
        </button>
      </form>
      
      <!-- Link quay lại đăng nhập -->
      <div class="mt-6 text-center">
        <a href="/Login" class="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to log in
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const resetSuccess = ref(false)

// Kiểm tra độ dài mật khẩu
const hasMinLength = computed(() => {
  return password.value.length >= 8
})

// Kiểm tra ký tự đặc biệt
const hasSpecialChar = computed(() => {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  return specialChars.test(password.value)
})

// Kiểm tra form hợp lệ
const isFormValid = computed(() => {
  return hasMinLength.value && 
         hasSpecialChar.value && 
         password.value === confirmPassword.value && 
         password.value !== ''
})

// Hàm đặt lại mật khẩu
function resetPassword() {
  if(!isFormValid.value) {
    if(!hasMinLength.value) {
      alert('Password must be at least 8 characters')
      return
    }
    if(!hasSpecialChar.value) {
      alert('Password must contain at least one special character')
      return
    }
    if(password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    return
  }
  
  // Xử lý đặt lại mật khẩu (trong thực tế sẽ gọi API)
  console.log('Mật khẩu đã được đặt lại:', password.value)
  resetSuccess.value = true
  alert('Password has been reset successfully')
  
  // Chuyển hướng đến trang đăng nhập (thay thế bằng router trong ứng dụng thực)
  setTimeout(() => {
    window.location.href = '/Login'
  }, 1500)
}
</script>

<style scoped>
.set-password-page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.lock-icon {
  box-shadow: 0 0 0 4px rgba(229, 231, 235, 0.5);
}
</style>