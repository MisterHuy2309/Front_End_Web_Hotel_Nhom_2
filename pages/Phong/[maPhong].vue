<!-- Trang Mạnh Code xin đừng động vào -->
<template>
  <header>
      <TheHeader />
    </header> 
  <div :class="['room-details-container', { 'dark-mode': theme.isDarkMode }]">
    <div class="room-gallery">
      <!-- Ảnh chính -->
      <div class="main-image" @click="openImage(0)">
        <img :src="images[0]" alt="Ảnh chính" class="gallery-img" />
      </div>
      <!-- Ảnh phụ -->
      <div class="sub-images">
        <div class="sub-image" v-for="(img, index) in subImages" :key="index" @click="openImage(index + 1)">
          <img :src="img" alt="'Ảnh phụ ' + (index + 1)" class="gallery-img" />
        </div>
      </div>
    </div>

    <!-- Modal phóng to -->
    <div v-if="isImageModalOpen" class="image-modal" @click.self="closeImage">
      <div class="modal-content">
        <img :src="images[currentSlide]" alt="Phóng to ảnh" class="modal-img zoom-img" />
        <va-button color="danger" class="close-button" @click="closeImage">X</va-button>
      </div>
    </div>

    <!-- Thông tin phòng -->
    <va-card class="room-info" outlined>
      <div class="info-content">
        <h1 class="room-title">{{ room.loaiPhong }} (Mã: {{ room.maPhong }})</h1>
        <p><strong>💵 Giá:</strong> {{ room.giaPhong }} VND</p>
        <p><strong>🏢 Tầng:</strong> {{ room.tang }}</p>
        <p><strong>🛏️ Kiểu giường:</strong> {{ room.kieuGiuong }}</p>
        <p><strong>📝 Mô tả:</strong> {{ room.moTa }}</p>
        <p><strong>📶 Tiện nghi:</strong></p>
        <div class="amenities animate__animated animate__fadeIn">
          <div
            class="amenity animate__animated animate__bounce"
            v-for="(amenity, index) in room.tienNghiList"
            :key="index"
          >
            <i
              :class="amenitiesMap[amenity]?.icon || defaultAmenityIcon"
              class="amenity-icon"
            ></i>
            <span class="amenity-name">{{ amenity }}</span>
          </div>
        </div>
        <p>
          <strong>🔥 Trạng thái:</strong>
          <span :class="room.tinhTrang === '1' ? 'status-available' : 'status-unavailable'">
            {{ room.tinhTrang === '1' ? 'Còn trống' : 'Đã đặt' }}
          </span>
        </p>
      </div>

      <div class="actions">
        <va-button
          :disabled="room.tinhTrang !== '1'"
          color="primary"
          class="book-button"
        >
          <nuxt-link
            :to="{
              name: 'DatPhong',
              params: { maPhong: room.maPhong }
            }"
            class="link-inside-button"
          >
            📩 Đặt phòng
          </nuxt-link>
        </va-button>
        <va-button color="secondary" class="share-button" @click="shareRoom">
          📤 Chia sẻ phòng
        </va-button>
        <nuxt-link to="/Phong" class="back-button">Quay lại danh sách phòng</nuxt-link>
      </div>
    </va-card>
  </div>

  <!-- Loading -->
  <va-loading v-if="loading" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import { useThemeStore } from '@/store/DarkMode'

const theme = useThemeStore()
theme.initializeDarkMode()

const room = ref({ tienNghiList: [] })
const loading = ref(true)
const error = ref(null)

const route = useRoute()
const { $api } = useNuxtApp()

const maPhong = route.params.maPhong
 import TheHeader from '../Components/Header.vue'
const images = ref([])
const subImages = ref([])
const currentSlide = ref(0)
const isImageModalOpen = ref(false)

const amenitiesMap = {
  "Máy lạnh": { icon: "fas fa-snowflake" }, // Icon điều hòa
  "Wifi miễn phí": { icon: "fas fa-wifi" }, // Icon wifi
  "Bộ trà/cà phê": { icon: "fas fa-mug-hot" }, // Icon tách trà/cà phê
  "Tivi": { icon: "fa-solid fa-tv" }, // Icon TV
  "Tủ lạnh": { icon: "fas fa-ice-cream" }, // Icon tủ lạnh
  "Bồn tắm": { icon: "fas fa-bath" }, // Icon bồn tắm
  "Mini Bar": { icon: "fa-solid fa-martini-glass-empty" }, // Icon mini bar (chọn chai rượu làm biểu tượng)
 // Icon mini bar
  "Máy sấy tóc": { icon: "fas fa-blow-dryer" }, // Icon máy sấy tóc
  "Bàn làm việc": { icon: "fas fa-desktop" }, // Icon bàn làm việc
  "Bồn cầu": { icon: "fas fa-toilet" }, // Icon bồn cầu
  "Bồn rửa mặt": { icon: "fas fa-sink" }, // Icon bồn rửa mặt
  "Máy giặt": { icon: "fas fa-washing-machine" }, // Icon máy giặt
  "Bếp": { icon: "fas fa-utensils" } // Icon bếp
};

const defaultAmenityIcon = "ri-question-line"; // Remix Icon mặc định

onMounted(async () => {
  try {
    const response = await $api.get(`http://nhom2webkhachsan.runasp.net/api/PhongWithTienNghi/${maPhong}`)
    if (response.data) {
      room.value = {
        ...response.data,
        tienNghiList: JSON.parse(response.data.tienNghi)
      }
      images.value = [
        response.data.urlAnhChinh,
        response.data.urlAnhPhu1,
        response.data.urlAnhPhu2
      ].filter(Boolean)

      subImages.value = images.value.slice(1) // ảnh phụ là từ index 1 trở đi
    } else {
      error.value = 'Không tìm thấy thông tin cho mã phòng này.'
    }
  } catch (err) {
    error.value = `Lỗi: ${err.message}`
    console.error('Lỗi:', err)
  } finally {
    loading.value = false
  }
})

const openImage = (index) => {
  currentSlide.value = index
  isImageModalOpen.value = true
}

const closeImage = () => {
  isImageModalOpen.value = false
}

const shareRoom = async () => {
  const link = window.location.href
  try {
    await navigator.clipboard.writeText(link)
    alert('📤 Đã sao chép link phòng vào clipboard!')
  } catch (err) {
    alert('❌ Sao chép thất bại, vui lòng thử lại.')
  }
}
</script>

<style scoped>
.room-details-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: stretch;
  transition: background-color 0.3s, color 0.3s;
}

.room-details-container.dark-mode {
  background-color: #2c3e50;
  color: #894040;
}

.room-gallery {
  flex: 1;
  display: flex;
  min-height: 500px;
  max-width: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.main-image {
  flex: 1;
  overflow: hidden;
}

.sub-images {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sub-image {
  flex: 1;
  overflow: hidden;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cắt gọn ảnh để vừa với khung */
  cursor: pointer;
  transition: transform 0.3s;
}

.sub-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cắt gọn ảnh phụ để vừa với khung */
  border-radius: 5px;
  transition: transform 0.3s;
}

.sub-image img:hover {
  transform: scale(1.05); /* Hiệu ứng phóng to khi hover */
}

/* Modal phóng to */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
}

.modal-img {
  max-width: 100vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
}

.zoom-img {
  transition: transform 0.3s;
}

.zoom-img:hover {
  transform: scale(1.05);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Thông tin phòng */
.room-info {
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background-color: #e0b3ff; /* Màu tím nhạt */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;
}

.room-details-container.dark-mode .room-info {
  background-color: #151515 !important; /* Bắt buộc sử dụng màu tím đậm */
  color: #ffffff !important; /* Chữ màu trắng */
}

.room-details-container.dark-mode .amenity-icon {
  color: #ffffff; /* Icon màu trắng */
}

.room-details-container.dark-mode .amenity-name {
  color: #ffffff; /* Tên tiện nghi màu trắng */
}

.room-details-container.dark-mode .room-title {
  color: #ffffff !important;
  border-bottom: 2px solid #ffffff; /* Đường gạch dưới màu trắng */
}

.room-details-container.dark-mode .status-available {
  color: #2ecc71; /* Màu xanh lá cho trạng thái "Còn trống" */
}

.room-details-container.dark-mode .status-unavailable {
  color: #e74c3c; /* Màu đỏ cho trạng thái "Đã đặt" */
}

.info-content {
  margin-bottom: 20px;
}

.room-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;
}

.room-details-container.dark-mode .room-title {
  color: #000000;
}

.status-available {
  color: green;
  font-weight: bold;
}

.status-unavailable {
  color: red;
  font-weight: bold;
}

.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.amenity {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
}

.amenity-icon {
  font-size: 2rem; /* Kích thước icon */
  color: #4caf50; /* Màu sắc icon */
  margin-bottom: 5px;
}

.amenity-name {
  font-size: 0.9rem;
  color: #333;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.book-button, .share-button {
  width: 100%;
}

.back-button {
  text-align: center;
  display: block;
  padding: 10px 15px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.back-button:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .room-details-container {
    flex-direction: column;
    align-items: center;
  }

  .room-gallery,
  .room-info {
    max-width: 100%;
  }

  .room-gallery {
    flex-direction: column;
    min-height: auto;
  }

  .sub-images {
    flex-direction: row;
  }

  .sub-image {
    flex: 1;
  }
}
</style>
